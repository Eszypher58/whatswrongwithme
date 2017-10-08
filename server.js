var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");
var fs = require("fs");

var app = express();
var port = 8080;

//testing purpose
//var wavLocation = [path.join(__dirname + '/1507479996513.wav'), path.join(__dirname + '/1507481993009.wav')];
//var wavLocation = [{ id:0, name:'1507479996513.wav'}, {id:1, name:'1507481993009.wav'}];
var wavLocation = ['1507479996513.wav', '1507481993009.wav'];

app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.raw({ type: 'audio/wav', limit: '50mb' }));

app.use(express.static("wav_file"));

var exphbs = require("express-handlebars");

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

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

app.listen(port, function(error){

    console.log("listening on port: " + port);

});