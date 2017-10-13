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
        } else {
          window.location.href = "/signup-doctor"
        }
      })
    } else if (!data) {
        window.location.href = "/login";
    } else if (data.docPatient === false) {
      window.location.href = "/signup-patient";
    }
  })
}