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
		}
	).then(function(data){
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
		}
	).then(function(data){
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
		}
	).then(function(data){
		res.json(data);
	}).catch(function(err){
		throw err;
	});
});

//Update a specific user's user data
profileRouter.put("/profile/user/:id", function(req, res){
	db.User.update(
		{req.body}
	).then(function(data){
		res.json(data);
	}).catch(function(err){});
		throw err;
});

//Update a specific doctor's doctor data
profileRouter.put

//Update a specific patient's patient data


//Create a specific user


//Delete a specific user