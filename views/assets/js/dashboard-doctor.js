function onSignIn(googleUser) {
  var googleprofile = googleUser.getBasicProfile();
  var myUserEntity = {};
  myUserEntity.Id = googleprofile.getId();
  myUserEntity.Name = googleprofile.getName();
  sessionStorage.setItem('myUserEntity',JSON.stringify(myUserEntity));
  $.get("/profile/googleid/" + googleprofile.getId(), function(data) {
    if ((data) && (data.docPatient === true)) {
      $.get("/doctor/user/" + data.id, function(docData) {
        if(docData) {
          console.log(data)
          $("#doctor-name").text(" Dr. " + data.firstName + " " + data.lastName);
/*
          //displays doctor name after Welcom, [doctor name]
          var queryURL = "https://api.betterdoctor.com/2016-03-01/doctors/" + docData.betterDoctorId + "?user_key=d9aae6ac51be978b847e7ed2a8ee5b21";
          $.ajax({
            method:"GET",
            url:queryURL
          }).done(function(result){

            console.log(result.data.profile);
            var fName = result.data.profile.first_name;
            var lName = result.data.profile.last_name;
            $("#first-name").text(fName);
            $("#last-name").text(lName);

          })
*/
          $.ajax({
            method:"GET",
            url:"/profile/patients/" + 1,
          }).done(function(result){

            console.log(result);
            
            for (var i = 0; i < result.length; i++) {

              var patient = result[i].User;
              var name = patient.firstName + " " + patient.lastName;
              console.log(name);

              //var option = $("#p"+ (i+1));
              //console.log(result[i].UserId);
              var option = $("<option>");
              option.attr("id", "#p"+ (i+1));
              option.attr("data_value", result[i].UserId);
              option.text(name);

              $("#patientList").append(option.text(name));

            }

            $("#patientList").on("change",function(e){

              //console.log("patient changed");

              //console.log(e);

              var data = $("#patientList")["0"].selectedOptions[0].attributes[1].nodeValue;

              console.log($("#patientList")["0"].selectedOptions[0].attributes[1].nodeValue);






            })

          })


          

        } else {
          // window.location.href = "/signup-doctor"
        }
      })
    } else if (!data) {
        window.location.href = "/login";
    } else if (data.docPatient === false) {
      // window.location.href = "/signup-patient";
    }
  })
}