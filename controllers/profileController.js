var express = require("express");
var db = require("../models");
var profileRouter = express.Router();
var path = require("path");
var bodyParser = require("body-parser");

//Set up parsing
profileRouter.use(bodyParser.urlencoded({ extended: true }));
profileRouter.use(bodyParser.json());
profileRouter.use(bodyParser.text());
profileRouter.use(bodyParser.json({ type: "application/vnd.api+json" }));


//Get the profile data for a specific user from the Users table and either the Doctor or Patient table
profileRouter.get("/profile/:id", function(req, res){
	db.User.findOne(
		{
			where: {
				id: req.params.id,
				isActive: true
			},
			include: [db.Doctor, db.Patient]
	}).then(function(data){
		res.json(data);
	}).catch(function(err){
		throw err;
	});
});

//Get All Active Doctors
profileRouter.get("/profile/activeDrs", function(req, res){
	db.Doctor.findAll(
		{
			where: {
				isActive: true
			},
			include: [db.User], 
			order: [User, "lastName", "ASC"]
	}).then(function(data){
		res.json(data);
	}).catch(function(err){
		throw err;
	});
})

//Get All Active Patients of a Specific Doctor
profileRouter.get("/profile/patients/:drId", function(req, res){
	db.Patient.findAll(
		{
			where:{
				isActive: true,
				DoctorId: req.params.drId
			}
			include: [db.User],
			order: [User, "lastName", "ASC"]
	}).then(function(data){
		res.json(data);
	}).catch(function(err){
		throw err;
	});
});

//Update a specific user's user data
profileRouter.put("/profile/user/:id", function(req, res){
	db.User.update(
		{req.body}, 
		{
			where: {
				id: req.params.id
			}
	}).then(function(data){
		res.json(data);
	}).catch(function(err){
		throw err;
	});
});

//Update a specific doctor's doctor data
profileRouter.put("/profile/dr/:id", function(req, res){
	db.Doctor.update(
	  {req.body},
	  {
	  	where: {
	  		id: req.params.id
	  	}
	}).then(function(data){
		res.json(data);
	}).catch(function(err){
		throw err;
	});
});

//Update a specific patient's patient data
profileRouter.put("/profile/patient/:id", function(req, res){
	db.Patient.update(
	  {req.body}, 
	  {
	  	where: {
	  		id: req.params.id
	  	}
	}).then(function(data){
		res.json(data);
	}).catch(function(err){
		throw err;
	});
});

//Create a specific user
profileRouter.post("/user", function(req, res){
	db.User.create(
	  {req.body}
	).then(function(data){
		res.json(data);
	}).catch(function(err){
		throw err;
	});
});

//Create a specific Doctor - must have User ID in req.body
profileRouter.post("/doctor", function(req, res){
	db.Doctor.create({req.body}).then(function(data){
		res.json(data);
	}).catch(function(err){
		throw err;
	});
});

//Create a specific Patient - must have User ID in req.body
profileRouter.post("/patient", function(req, res){
	db.Patient.create({req.body}).then(function(data){
		res.json(data);
	}).catch(function(err){
		throw err;
	});
});

//Delete a specific user, also cascades to delete associated Doctor/Patient profile.  
//Soft Delete - changes isActive to false, does not remove record
profileRouter.delete("/:id", function(req, res){
	db.User.update(
		{
			isActive: false
		},
		{
			where: {
				id: req.params.id
			}
		}
	).then(function(data){
		db.User.findOne({
			where: {
				id: req.params.id
			}
		}).then(function(result){
			if (result.docPatient){
				db.Doctor.update(
				  {
				  	isActive: false
				  },
				  {
				  	where: {
				  		UserId: req.params.id
				  	}
				  }
				).then(function(finaldata){
					res.json(finaldata);
				}).catch(function(error){
					throw error;
				});
			}
			else{
				db.Patient.update(
				  {
				  	isActive: false
				  },
				  {
				  	where: {
				  		UserId: req.params.id
				  	}
				  }
				).then(function(finaldata){
					res.json(finaldata);
				}).catch(function(error){
					throw error;
				});				
			}
		});
	}).catch(function(err){
		throw err;
	});
});
