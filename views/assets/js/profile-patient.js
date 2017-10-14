var patientId;

function onSignIn(googleUser) {
  var googleprofile = googleUser.getBasicProfile();
  var myUserEntity = {};
  myUserEntity.Id = googleprofile.getId();
  myUserEntity.Name = googleprofile.getName();
  sessionStorage.setItem('myUserEntity',JSON.stringify(myUserEntity));
  $.get("/profile/googleid/" + googleprofile.getId(), function(data) {
    if ((data) && (data.docPatient === false)) {
      $.get("/patient/user/" + data.id, function(patientData) {
        if(patientData) {
          $("#patient-id").val(patientData.id);
          $("#first-name").val(data.firstName);
          $("#last-name").val(data.lastName);
          $("#dob").val(data.dob.split("T")[0]);
          $("#city").val(data.city);
          $("#state").val(data.state);
          $("#email").val(data.email);

          $("#patient-image").attr("src", data.imgUrl);
          $("#patient-name").text(data.firstName + " " + data.lastName);
          $(".bio").text(patientData.biography)

          $("#update").on("click", function() {
            var user = {
              firstName: $("#first-name").val(),
              lastName: $("#last-name").val(),
              dob: $("#dob").val(),
              city: $("#city").val(),
              state: $("#state").val(),
              email: $("#email").val()
            };
            $.ajax({
                url: '/profile/user/' + data.id,
                type: 'PUT',
                data: user,
                success: function(result) {
                  var patient = {
                    biography: $("#biography").val()
                  }
                  $.ajax({
                      url: '/profile/patient/' + data.id,
                      type: 'PUT',
                      data: patient,
                      success: function(result) {
                        $(".bio").text($("#biography").val());
                        $("#updated").attr("style", "display:block");
                      }
                  });
                }
            });
          })
        } else {
          window.location.href = "/signup-patient"
        }
      })
    } else if (!data) {
        window.location.href = "/login";
    } else if (data.docPatient === true) {
      window.location.href = "/signup-doctor"
    }
  })
}