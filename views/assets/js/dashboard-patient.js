var showComments = function(patientId, patientPic, doctorPic, patientName, doctorName){
    console.log("in comments");
    $.get("/chart/" + patientId, function(data){
        console.log(data);
        for(var i = 0; i < data.length; i++){     
            var pic = "";
            var name = "";
            if (data[i].isDrComment){
                pic = doctorPic;
                name = doctorName;
            }
            else{
                pic = patientPic;
                name = patientName;
            }
            var updated = data[i].updatedAt;
            var chatText = data[i].comment;
            var commentHtml = '<div class="chat-box"> <div> <img class="img-circle chat-avatar" src="';
            commentHtml += pic + '"> <h5 class="chat-sender">';
            commentHtml += name + '</h5> <p class="chat-time"><i class="ace-icon fa fa-clock-o"></i>';
            commentHtml += updated + '</p> </div> <div> <p class="chat-text">'
            commentHtml += chatText + '</p> </div> </div>';
            $("#comments").append(commentHtml);
            console.log(commentHtml);
        }
    });
};

function onSignIn(googleUser) {
    var googleprofile = googleUser.getBasicProfile();
    var myUserEntity = {};
    myUserEntity.Id = googleprofile.getId();
    myUserEntity.Name = googleprofile.getName();
    sessionStorage.setItem('myUserEntity',JSON.stringify(myUserEntity));

    $.get("/profile/googleid/" + googleprofile.getId(), function(data) {
    
        if ((data) && (data.docPatient === false)) {
            console.log(data);
            var patientName = data.firstName + " " + data.lastName;
            var patientId = data.Patient.id;
            var patientPic = data.imgUrl;
            $("#patient-name").text(" " + patientName);
            var doctorId = data.Patient.DoctorId;
            displayWave(data.firstName, data.lastName);
            $.get("/doctor/doctor/" + doctorId, function(result){
                console.log("doctor: " + result);
                var doctorName = result.User.firstName + " " + result.User.lastName;
                $("#doctor-name").text(doctorName);    
                var queryURL = "https://api.betterdoctor.com/2016-03-01/doctors/" + result.betterDoctorId + "?user_key=d9aae6ac51be978b847e7ed2a8ee5b21";
               $.ajax({
                  method:"GET",
                  url:queryURL
                }).done (function(response) {
                    console.log(response);
                    var drPic = response.data.profile.image_url;
                    $("#rating").text(response.data.ratings[0]);
                    var specialties = response.data.specialties[0].name;
                    for(var i = 1; i < response.data.specialties; i++){
                        specialties += ", " + response.data.specialties[i].name;
                    }
                    $("#specialties").text(specialties);
                    $("#website").html("<a href='" + response.data.practices[0].website + "'>" + response.data.practices[0].website + "</a>");
                    var drIns = response.data.insurances;
                    var patientInsProv = data.Patient.insuranceProvider;
                    var patientInsPlan = data.Patient.insuanceType;
                    var insProvIndex = drIns.findIndex(x => x.insurance_provider==patientInsProv);
                    var insPlanIndex = drIns.findIndex(x => x.insurance_plan==patientInsPlan);
                    if(insProvIndex != -1 && insPlanIndex != -1){
                        $("#insurance").text("Accepts Your Insurance");
                    }
                    else{
                        $("#insurance").text("Does Not Accept Your Insurance");
                    }
                    $("#dr-avatar").attr("src", drPic);
                    showComments(patientId, patientPic, drPic, patientName, doctorName);
                });
            });
        }
    });
};