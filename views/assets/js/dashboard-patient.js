function onSignIn(googleUser) {
    var googleprofile = googleUser.getBasicProfile();
    var myUserEntity = {};
    myUserEntity.Id = googleprofile.getId();
    myUserEntity.Name = googleprofile.getName();
    sessionStorage.setItem('myUserEntity',JSON.stringify(myUserEntity));

    $.get("/profile/googleid/" + googleprofile.getId(), function(data) {
    
        if ((data) && (data.docPatient === false)) {
            console.log(data);
            $("#patient-name").text(" " + data.firstName + " " + data.lastName);
            var doctorId = data.Patient.DoctorId;
            displayWave(data.firstName, data.lastName);
            $.get("/doctor/doctor/" + doctorId, function(result){
                console.log("doctor: " + result);
                $("#doctor-name").text(result.User.firstName + " " + result.User.lastName);    
                var queryURL = "https://api.betterdoctor.com/2016-03-01/doctors/" + result.betterDoctorId + "?user_key=d9aae6ac51be978b847e7ed2a8ee5b21";
               $.ajax({
                  method:"GET",
                  url:queryURL
                }).done (function(response) {
                    console.log(response);
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
                });
            });
        }
    });
};