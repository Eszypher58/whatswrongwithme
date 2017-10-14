
        
                //create wavesurfer to display a wave file onto the front end html
                //this simple front end assume server returns an array with file name inside
                //frontend makes a ajax request to server and display the wave form of the last file in returned data
        
                var wavesurfer;
        
                //when page load, display the latest wav file.
                $.ajax({
        
                    method:"GET",
                    url:"/data.json"
        
                }).done(function(data){
        
                    //console.log(data);
        
                    //var lastIndex = data.length - 1;
                    var firstIndex = 0;
        
                    wavesurfer = WaveSurfer.create({
        
                        container: "#waveform",
                        waveColor: 'violet',
                        progressColor: 'purple'
        
                    })
        
                    wavesurfer.load("username/wav/" + data[firstIndex].filename);
    
                    wavesurfer.on("ready", function(){
    
    
                    $("#playSound").attr("data_value", data[firstIndex].filename);
    
                    $("#playSound").on("click", function(e){
    
                        console.log("clicked playsound");
    
    
                            wavesurfer.play();
    
                    })
    
    
    
                    })
    
                    for (var i = 0; i < data.length; i++) {
    
                        $("#op" + (i+1)).attr("data_value", data[i].filename);
    
                    }
    
    
        
                    /*
                    wavesurfer.on('ready', function () {
                        var spectrogram = Object.create(WaveSurfer.Spectrogram);
                        spectrogram.init({
                            wavesurfer: wavesurfer,
                            container: "#wave-spectrogram",
                            fftSamples: 1024,
                            labels: false
                        });
                    });
                    */
        
                })