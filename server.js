//Dependencies
var express = require("express");
var methodOverride = require("method-override");
var bodyParser = require("body-parser");
var handlebars = require("express-handlebars");
var path = require("path");
var fs = require("fs");

//Initialize database
var db = require("./models");
db.sequelize.sync({  }).then(function(){

	//Set up Express
	var app = express();
	var PORT = process.env.PORT || 8080;

	//Set up method-override, body-parser, and handlebars
	app.use(methodOverride("_method"));
	app.use(bodyParser.urlencoded({ extended: true }));
	app.engine("handlebars", handlebars({ defaultLayout: "main" }));
	app.set("view engine", "handlebars");

	//Send to controller
    app.use(express.static(__dirname + '/public'));
    
    //Stanley's Code
    var routes = require("./controllers/media_controller.js");
    app.use("/", routes);
    app.use(express.static("media"));
    //end of Stanley's code

	//Initialize server
	app.listen(PORT, function() {
  	console.log('Listening on port ' + PORT);
	});
}).catch(function(err){
	return console.log(err);
});

