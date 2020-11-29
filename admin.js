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
    
		var i=0;
	   var j=0;
	   var myArray=[];
	   var idArray=[];
     var data;
     var notSwipedArray=[];
     var photoArray=[];
     var descriptionArray=[];
     var nameArray=[];
     var genderArray=[];
     var lookingForArray=[];
     var distanceArray=[];
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
     var userArray=[];
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
                          console.log(doc.id,doc.data().profileImageUrl);
                          document.getElementById("card").style.backgroundImage="url("+photo[index]+")";


                          
                          elementRight.onclick = function() {

                            
                           if(index<userReportArray.length)
                           {
                             document.getElementById("card").style.backgroundImage="url("+photo[index+1]+")";
                                // document.getElementById("userNameData").innerHTML=nameArray[index+1];
                                // document.getElementById("userDescriptionData").innerHTML=descriptionArray[index+1];
                              // document.getElementById("userGenderData").innerHTML=genderArray[index+1];
                             // document.getElementById("userWantedGenderData").innerHTML=lookingForArray[index+1];
                            
                               
                              console.log("Przesunales w prawo: "+userReportArray[index]);
                          
                                  
                          
                          index++;
                           }
                           else
                           {
                             console.log("Koniec userow do sprawdzenia!");
                             index++;
                           }
                                                                         
                           
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