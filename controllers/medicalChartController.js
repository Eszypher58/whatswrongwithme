var express = require("express");
var db = require("../models");
var chartRouter = express.Router();
var path = require("path");
var bodyParser = require("body-parser");

//Set up parsing
chartRouter.use(bodyParser.urlencoded({ extended: true }));
chartRouter.use(bodyParser.json());
chartRouter.use(bodyParser.text());
chartRouter.use(bodyParser.json({ type: "application/vnd.api+json" }));

//Get all Active comments for a specific Patient


//Create a new comment for a specific Patient


//Update a specific comment


//Delete a comment