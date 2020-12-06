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
                          
                          elementRight.onclick = function() {
                            console.log(userReportArray[index]);
                            
                           if(index<userReportArray.length)
                           {
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
                      db.collection("users").doc(userReportArray[index+1]).collection("Reports").where("Reason", "==","Messages")
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
                        

                            db.collection("users").doc(userReportArray[index]).collection("Reports")
                            .get()
                            .then(res => {
                              res.forEach(element => {
                                element.ref.delete();
                              });
                            });

                              console.log(userReportArray[index]);
                            db.collection("Matches").where("id1","==",userReportArray[index])
                            .get()
                            .then(function(querySnapshot) {
                                querySnapshot.forEach(function(doc) {
                                  console.log(doc.id);
                                    // doc.data() is never undefined for query doc snapshots
                                    db.collection("Matches").doc(doc.id).delete().then(function() {
                                        console.log("Document successfully deleted!");
                                    }).catch(function(error) {
                                        console.error("Error removing document: ", error);
                                    });                           
                                     });
                            })
                            .catch(function(error) {
                                console.log("Error getting documents: ", error);
                            });

                            db.collection("Matches").where("id2","==",userReportArray[index])
                            .get()
                            .then(function(querySnapshot) {
                                querySnapshot.forEach(function(doc) {
                                  console.log(doc.id);
                                    // doc.data() is never undefined for query doc snapshots
                                    db.collection("Matches").doc(doc.id).delete().then(function() {
                                        console.log("Document successfully deleted!");
                                    }).catch(function(error) {
                                        console.error("Error removing document: ", error);
                                    });                           
                                     });
                            })
                            .catch(function(error) {
                                console.log("Error getting documents: ", error);
                            });

                            db.collection("users").doc(userReportArray[index]).set({
                                banned:true
                            })
                            .then(function() {
                                console.log("User zbanowany!");
                            })
                            .catch(function(error) {
                                console.error("Error writing document: ", error);
                            });

                        

                             document.getElementById("card").style.backgroundImage="url("+photo[index+1]+")";
                                 document.getElementById("userNameData").innerHTML=nameArray[index+1];
                                 document.getElementById("userDescriptionData").innerHTML=descriptionArray[index+1];
                               document.getElementById("userGenderData").innerHTML=genderArray[index+1];
                              document.getElementById("userWantedGenderData").innerHTML=lookingForArray[index+1];
                            
                               
                              console.log("Przesunales w prawo: "+userReportArray[index]);
                          
                                  
                          
                          index++;
                           }
                           else
                           {
                             console.log("Koniec userow do sprawdzenia!");
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
                                  console.log(userReportArray[index]);
                                  db.collection("users").doc(userReportArray[index+1]).collection("Reports").where("Reason", "==","Messages")
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
                             document.getElementById("card").style.backgroundImage="url("+photo[index+1]+")";
                             document.getElementById("userNameData").innerHTML=nameArray[index+1];
                             document.getElementById("userDescriptionData").innerHTML=descriptionArray[index+1];
                           document.getElementById("userGenderData").innerHTML=genderArray[index+1];
                          document.getElementById("userWantedGenderData").innerHTML=lookingForArray[index+1];
                        
                           
                                  console.log("Nie bedziesz zbanowany");
                                  index++;

                                }

                         }
                        });
                  }
                });
            }
          });
      

//              const usersRef = db.collection("users").doc(doc.id).collection("Reports").doc(user.uid)
//                      usersRef.get().then((docSnapshot) => {
//                        console.log(doc.id);
                     
//                       var distance=document.getElementById("labelForDistance").textContent;
//                       var wantedDistance=document.getElementById("textInput").value;
//                          if (!docSnapshot.exists&&doc.id!=user.uid&&doc.data().gender==userLookingFor) { 

//                            console.log(doc.data().gender,userLookingFor);
//                           console.log("doc.id",doc.data());
//           notSwipedArray.push(doc.id);
//           console.log(distance);
//           distanceArray.push(distance);
//          console.log(doc.id);
//           console.log("Nie istnieje sobie");  
       
//           const photoRef = db.collection("users").doc(doc.id);
//                      photoRef.get().then((docSnapshot) => {
//                          if (docSnapshot.exists) { 
                                       
//                           photoArray.push(doc.data().profileImageUrl);
//                           nameArray.push(doc.data().name);
//                           descriptionArray.push(doc.data().description);
//                           genderArray.push(doc.data().gender);
//                           lookingForArray.push(doc.data().lookingFor);

//                           console.log(doc.id," ",doc.data().profileImageUrl);

//                               console.log(notSwipedArray.length);
//                               var index=0;
                             
//                              // console.log(userLookingFor,genderArray[index]);

                             
//                               document.getElementById("card").style.backgroundImage="url("+photoArray[index]+")";
//                             //  document.getElementById("lgabelForDistance").innerHTML=distanceArray[index];
//                             getUserDistance(notSwipedArray[index]);
//                             document.getElementById("userNameData").innerHTML=nameArray[index];
//                               document.getElementById("userDescriptionData").innerHTML=descriptionArray[index];
//                               document.getElementById("userGenderData").innerHTML=genderArray[index];
//                               document.getElementById("userWantedGenderData").innerHTML=lookingForArray[index];
                             

                                                    


//                               elementRight.onclick = function() {

//   if(index<notSwipedArray.length && notSwipedArray[index]!=user.uid)
//   { 
//     console.log("cos tam:",notSwipedArray[index]);

//     getUserDistance(notSwipedArray[index+1]);

//       document.getElementById("card").style.backgroundImage="url("+photoArray[index+1]+")";
//       document.getElementById("userNameData").innerHTML=nameArray[index+1];
//       document.getElementById("userDescriptionData").innerHTML=descriptionArray[index+1];
//       document.getElementById("userGenderData").innerHTML=genderArray[index+1];
//       document.getElementById("userWantedGenderData").innerHTML=lookingForArray[index+1];
   
     
//     console.log("Przesunales w prawo: "+notSwipedArray[index]);

//     db.collection("users").doc(notSwipedArray[index]).collection("SwipedBy").doc(user.uid).set({
//            swipe:true,
//            swiped:user.uid
//         })
//         db.collection("users").doc(user.uid).collection("SwipedBy").doc(notSwipedArray[index]).get()
//             .then((docSnapshot) => {
//               if(docSnapshot.exists)
//               {
//               console.log("Przed zapisaniem:", notSwipedArray[index-1]);
//               console.log(user.uid);
//               var dataSwipe=docSnapshot.data().swipe;
//               console.log(dataSwipe);
//           if (docSnapshot.exists && notSwipedArray[index-1]!=user.uid && dataSwipe==true) 
//           {  
//             console.log("Zapisywany:",notSwipedArray[index-1]);
//             db.collection("Matches").doc().set({
//           id2: notSwipedArray[index-1],
//           id1:user.uid
//         })
//           }
//         }
//         else
//         {
//           console.log("Jeszcze nie zostales przez niego przesuniety");
//         }
//           });          

// index++;
  

//       }


// else{
//   window.alert("Koniec zdjec");
//          index++;

// }
 
//       }

//       elementLeft.onclick = function() {
      
//         if(index<notSwipedArray.length && notSwipedArray[index]!=user.uid)
//         {
//             document.getElementById("card").style.backgroundImage="url("+photoArray[index+1]+")";
//             document.getElementById("userNameData").innerHTML=nameArray[index+1];
//             document.getElementById("userDescriptionData").innerHTML=descriptionArray[index+1];
//             document.getElementById("userGenderData").innerHTML=genderArray[index+1];
//             document.getElementById("userWantedGenderData").innerHTML=lookingForArray[index+1];
//             getUserDistance(notSwipedArray[index+1]);
               
           
//           console.log("Przesunales w lewo: "+notSwipedArray[index]);
      
//           db.collection("users").doc(notSwipedArray[index]).collection("SwipedBy").doc(user.uid).set({
//                  swipe:false,
//                  swiped:user.uid
//               })                    
      
//       index++;
        
      
//             }
      
      
//       else{
//         window.alert("Koniec zdjec");
//                index++;
      
//       }
       
//             }
          
                       
                      
//                      i++;
                  

//     }
//     else if(docSnapshot.exists)
//     {
//       console.log(i); 
//         console.log("istnieje");
//         i++;
//     }
//                      });

                                       
            
//                          }
//      })
                     



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
