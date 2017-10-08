var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");
var fs = require("fs");

var app = express();
var port = 8080;


app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.raw({ type: 'audio/wav', limit: '50mb' }));

app.use(express.static('audio_test.html'));

app.get('/', function(req, res){

    console.log("hit get");

    res.sendFile(path.join(__dirname + "/audio_test.html"));

})

app.post('/', function (req, res) {
  console.log("audio recived", req.body);

  var audioBlob = req.body;

  var now = Date.now();
  var fileName = now + ".wav";

  //if(!recorder) return alert('No recording found.');
/*
  var file = new File([audioBlob], fileName, {
      type: "audio/wav"
  });
*/
  fs.writeFile(fileName, audioBlob, function(err){

    if (err) {

        return console.log(err);

    }

    res.end("posted something")

  })

//console.log(req);


  
});

app.listen(port, function(error){

    console.log("listening on port: " + port);

});