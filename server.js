//Dependencies
var express = require("express");
var methodOverride = require("method-override");
var bodyParser = require("body-parser");
var handlebars = require("express-handlebars");
var path = require("path");
var fs = require("fs");

//Initialize database
var db = require("./models");
db.sequelize.sync({ force: true }).then(function(){

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

//testing purpose
//var wavLocation = [path.join(__dirname + '/1507479996513.wav'), path.join(__dirname + '/1507481993009.wav')];
//var wavLocation = [{ id:0, name:'1507479996513.wav'}, {id:1, name:'1507481993009.wav'}];
var wavLocation = ['1507479996513.wav', '1507481993009.wav'];

app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.raw({ type: 'audio/wav', limit: '50mb' }));

app.use(express.static("wav_file"));


app.get('/', function(req, res){
    
        console.log("hit get");
    
        //res.sendFile(path.join(__dirname + "/audio_test.html"));
        //res.json(wavLocation);
        res.render("index", {data: wavLocation});
    
    })
    
    app.get("/data.json", function(req, res){
    
        console.log("hit get data.json");
        res.json(wavLocation);
    
    })
    
    //when user post sound data, server process it by saving as wav file. wav file is named using number of milisecond since epoch to avoid conflict with same file name
    app.post('/', function (req, res) {
      console.log("audio recived", req.body);
    
      var audioBlob = req.body;
    
      var now = Date.now();
      var fileName = now + ".wav";
    
      fs.writeFile(fileName, audioBlob, function(err){
    
        if (err) {
    
            return console.log(err);
    
        }
        res.redirect("/");
        res.end("posted something");
    
      })
    
    //console.log(req);
    
    
      
    });



//end of Stanley's code




	//Initialize server
	app.listen(PORT, function() {
  	console.log('Listening on port ' + PORT);
	});
}).catch(function(err){
	return console.log(err);
});

