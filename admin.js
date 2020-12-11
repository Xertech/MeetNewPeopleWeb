var config = {
    apiKey: "AIzaSyCyXMFAOvenY2UUxOeCqtwYX_qBem3J8JU",
    authDomain: "meetnewpeople-1f8ee.firebaseapp.com",
    databaseURL: "https://meetnewpeople-1f8ee.firebaseio.com",
    projectId: "meetnewpeople-1f8ee",
    storageBucket: "meetnewpeople-1f8ee.appspot.com",
    messagingSenderId: "469600573842",
    appId: "1:469600573842:web:38474ef46023018aec494b"
  };
    firebase.initializeApp(config);
  const db = firebase.firestore();


function checkReportProfiles()
{
    
     var descriptionArray=[];
     var nameArray=[];
     var genderArray=[];
     var lookingForArray=[];
     var foo = document.getElementById("card");




     var elementLeft = document.createElement("button");
     var leftButton = document.createTextNode("");
     elementLeft.appendChild(leftButton);
     elementLeft.className = "leftbutton";

     foo.appendChild(elementLeft);


     var elementRight = document.createElement("button");
     var rightButton = document.createTextNode("");
     elementRight.appendChild(rightButton);
     elementRight.className = "rightbutton";
     var userReportArray=[];
    var photo=[];
     foo.appendChild(elementRight);
     db.collection("users").get()
     .then(function(querySnapshot) {

         querySnapshot.forEach(function(doc) {

          db.collection("users").doc(doc.id)
          .get().then(
          doc => {
            if (doc.exists) {
              db.collection("users").doc(doc.id).collection("Reports").get().
                then(sub => {
                  if (sub.docs.length > 0) {
                    
                    console.log(doc.id,'subcollection exists');
                    userReportArray.push(doc.id);
                    
                    const photoRef = db.collection("users").doc(doc.id);
                     photoRef.get().then((docSnapshot) => {
                         if (docSnapshot.exists) { 

                          var index=0;
                                            
                  

                          photo.push(doc.data().profileImageUrl);
                          nameArray.push(doc.data().name);
                          descriptionArray.push(doc.data().description);
                          genderArray.push(doc.data().gender);
                          lookingForArray.push(doc.data().lookingFor);
                          console.log(doc.id,doc.data().profileImageUrl);
                          document.getElementById("card").style.backgroundImage="url("+photo[index]+")";
                          document.getElementById("userNameData").innerHTML=nameArray[index];
                          document.getElementById("userDescriptionData").innerHTML=descriptionArray[index];
                          document.getElementById("userGenderData").innerHTML=genderArray[index];
                          document.getElementById("userWantedGenderData").innerHTML=lookingForArray[index];

                          showReportCount(userReportArray,index);
                          banUser(userReportArray,index,photo,nameArray,descriptionArray,genderArray,lookingForArray);

}
});
}
});
}
});
                

                        });

                    });
}


function logout(){
  firebase.auth().signOut();
  window.location.replace("index.html");
}

function createAdmin()
{
  var email = document.getElementById('emailAdmin').value;
  var password = document.getElementById('passwordAdmin').value;

  if (email.length < 4) {
    alert('Please enter an email address.');
    return;
  }
  if (password.length < 4) {
    alert('Please enter a password.');
    return;
  }


firebase.auth().createUserWithEmailAndPassword(email, password).then(function(){
var user = firebase.auth().currentUser;

user.sendEmailVerification().then(function()
{
console.log("EMail wysłany");
})

}).
catch(function(error) {
    // Handle Errors here.
    var errorCode = error.code;
    var errorMessage = error.message;
    // [START_EXCLUDE]
    if (errorCode == 'auth/weak-password') {
      alert('The password is too weak.');
    } else {
      alert(errorMessage);
    }
    console.log(error);
    
  });
}

function showReportCount(userReportArray,index)
{
  db.collection("users").doc(userReportArray[index]).collection("Reports").where("Reason", "==","Messages")
  .get()
  .then(function(querySnapshot) {
    var countReportMessages=0;
      querySnapshot.forEach(function(doc) {
        countReportMessages++;
          // doc.data() is never undefined for query doc snapshots
          console.log(doc.id, " => ", doc.data()," tyle:",countReportMessages);
        document.getElementById("reportedForMessages").innerHTML=countReportMessages;
        });
  })
  .catch(function(error) {
      console.log("Error getting documents: ", error);
  });
  db.collection("users").doc(userReportArray[index]).collection("Reports").where("Reason", "==","Photo")
  .get()
  .then(function(querySnapshot) {
    var countReportMessages=0;
      querySnapshot.forEach(function(doc) {
        countReportMessages++;
          // doc.data() is never undefined for query doc snapshots
          console.log(doc.id, " => ", doc.data()," tyle:",countReportMessages);
        document.getElementById("reportedForPicture").innerHTML=countReportMessages;
        });
  })
  .catch(function(error) {
      console.log("Error getting documents: ", error);
  });
  db.collection("users").doc(userReportArray[index]).collection("Reports").where("Reason", "==","Description")
  .get()
  .then(function(querySnapshot) {
    var countReportMessages=0;
      querySnapshot.forEach(function(doc) {
        countReportMessages++;
          // doc.data() is never undefined for query doc snapshots
          console.log(doc.id, " => ", doc.data()," tyle:",countReportMessages);
        document.getElementById("reportedForDescription").innerHTML=countReportMessages;
        });
  })
  .catch(function(error) {
      console.log("Error getting documents: ", error);
  });
}

function reportNext(userReportArray,index)
{
  db.collection("users").doc(userReportArray[index]).collection("Reports").where("Reason", "==","Messages")
  .get()
  .then(function(querySnapshot) {
    var countReportMessages=0;
      querySnapshot.forEach(function(doc) {
        countReportMessages++;
          // doc.data() is never undefined for query doc snapshots
          console.log(doc.id, " => ", doc.data()," tyle:",countReportMessages);
        document.getElementById("reportedForMessages").innerHTML=countReportMessages;
        });
  })
  .catch(function(error) {
      console.log("Error getting documents: ", error);
  });

  db.collection("users").doc(userReportArray[index+1]).collection("Reports").where("Reason", "==","Photo")
  .get()
  .then(function(querySnapshot) {
    var countReportMessages=0;
      querySnapshot.forEach(function(doc) {
        countReportMessages++;
          // doc.data() is never undefined for query doc snapshots
          console.log(doc.id, " => ", doc.data()," tyle:",countReportMessages);
        document.getElementById("reportedForPicture").innerHTML=countReportMessages;
        });
  })
  .catch(function(error) {
      console.log("Error getting documents: ", error);
  });

  db.collection("users").doc(userReportArray[index+1]).collection("Reports").where("Reason", "==","Description")
  .get()
  .then(function(querySnapshot) {
    var countReportMessages=0;
      querySnapshot.forEach(function(doc) {
        countReportMessages++;
          // doc.data() is never undefined for query doc snapshots
          console.log(doc.id, " => ", doc.data()," tyle:",countReportMessages);
        document.getElementById("reportedForDescription").innerHTML=countReportMessages;
        });
  })
  .catch(function(error) {
      console.log("Error getting documents: ", error);
  });

}
function banUser(userReportArray,index,photo,nameArray,descriptionArray,genderArray,lookingForArray)
{
  elementRight.onclick = function() {                            
    if(index<userReportArray.length)
    {
     reportNext(userReportArray,index);
     db.collection("users").doc(userReportArray[index]).collection("Reports")
     .get()
     .then(res => {
       res.forEach(element => {
         element.ref.delete();
       });
     });
   
     db.collection("Matches").where("id1","==",userReportArray[index])
     .get()
     .then(function(querySnapshot) {
         querySnapshot.forEach(function(doc) {
           console.log(doc.id);
             // doc.data() is never undefined for query doc snapshots
             db.collection("Matches").doc(doc.id).delete().then(function() {
                 console.log("Usunieto pary");
             })                          
              });
     })
   
     db.collection("Matches").where("id2","==",userReportArray[index])
     .get()
     .then(function(querySnapshot) {
         querySnapshot.forEach(function(doc) {
             db.collection("Matches").doc(doc.id).delete().then(function() {
                 console.log("Document successfully deleted!");
             })                          
              });
     })
     db.collection("users").doc(userReportArray[index]).set({
         banned:true
     })
     .then(function() {
         console.log("User zbanowany!");
     })
   
           reportNext(userReportArray,index);
                               
           document.getElementById("card").style.backgroundImage="url("+photo[index+1]+")";
               document.getElementById("userNameData").innerHTML=nameArray[index+1];
               document.getElementById("userDescriptionData").innerHTML=descriptionArray[index+1];
             document.getElementById("userGenderData").innerHTML=genderArray[index+1];
           document.getElementById("userWantedGenderData").innerHTML=lookingForArray[index+1];
                                                                       
         index++;
           }
           else
           {
             index++;
           }
    }
   
     elementLeft.onclick = function() {
   
     db.collection("users").doc(userReportArray[index]).collection("Reports")
     .get()
     .then(res => {
       res.forEach(element => {
         element.ref.delete();
       });
     });
           reportNext(userReportArray,index);
   
       document.getElementById("card").style.backgroundImage="url("+photo[index+1]+")";
       document.getElementById("userNameData").innerHTML=nameArray[index+1];
       document.getElementById("userDescriptionData").innerHTML=descriptionArray[index+1];
     document.getElementById("userGenderData").innerHTML=genderArray[index+1];
   document.getElementById("userWantedGenderData").innerHTML=lookingForArray[index+1];
       index++;
         }
}