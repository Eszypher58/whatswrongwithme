var express = require("express");
var db = require("../models");
var makeDir = require("make-dir");
var bodyParser = require("body-parser");
var fs = require("fs");

var router = express.Router();

router.use(bodyParser.json({ limit: '50mb' }));
router.use(bodyParser.raw({ type: 'audio/wav', limit: '50mb' }));

//read from db and display the newest file's waveform and assign 5 play button to reflect the 5 newest wav file.
router.get("/media", function(req, res){
    
    console.log("hit /media with get method");

    db.Media.findAll({

        order: [["id", "DESC"]],
        limit: 5,

    }).then(function(media){

        res.render("index", {data: media})

    })

});

//sends the result from db as json so the correct wave file is played back
router.get("/data.json", function(req, res){
    
    console.log("hit /data.json with get method");

    db.Media.findAll({

        order: [["id", "DESC"]],
        limit: 5,

    }).then(function(media){

        res.json(media);

    })

});

router.post('/media', function (req, res) {
  
    var audioBlob = req.body;
    var now = Date.now();
    var fileName = now + ".wav";
    var location = 'media/' + 'username/' + 'wav';

    makeDir(location).then(path => {

        fs.writeFile(path + "/" + fileName, audioBlob, function(err){
            
            if (err) {
            
                return console.log(err);
            
            }

            console.log("written file");

            //using Media_Test
            db.Media.create({

                filename: fileName,
                location: location,
                PatientId: 1
                //PatientId: req.params.id

            }).then(function(result){

                res.redirect("/media");

            }).catch(function(err){

                return console.log(err);

            })
      
        })

    });
    
});

module.exports = router;