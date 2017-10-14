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
    
                    $("#first-name").html(data.firstName);
                    //console.log($("#first-name"));
                    //console.log(data.firstName);
    
                    $("#last-name").html(data.lastName);
    
            }
        })
        
    }})
  }