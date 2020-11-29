
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
  
   function toggleSignIn() {
      if (firebase.auth().currentUser) {
        // [START signout]
        firebase.auth().signOut();
        // [END signout]
      } else {
        var email = document.getElementById('email').value;
        var password = document.getElementById('password').value;
        if (email.length < 4) {
          alert('Please enter an email address.');
          return;
        }
        if (password.length < 4) {
          alert('Please enter a password.');
          return;
        }
        // Sign in with email and pass.
        // [START authwithemail]
        firebase.auth().signInWithEmailAndPassword(email, password).then(function()
        {
          var user = firebase.auth().currentUser;
          var email_verified=user.emailVerified;
          firebase.auth().onAuthStateChanged(function(user) {
            //&&email_verified
            if (user) {
              sessionStorage.setItem("AuthenticationState", "Authenticated");
              //sessionStorage.setItem("AuthenticationExpires", addHours(1));
              window.open('main.html','_self');

              window.location.replace("main.html");
            } else {
              window.alert("Zweryfikuj email");
             // window.location.replace("index.html");

            }
          });

        }).
        catch(function(error) {
          // Handle Errors here.
          var errorCode = error.code;
          var errorMessage = error.message;
          // [START_EXCLUDE]
          if (errorCode === 'auth/wrong-password') {
            alert('Wrong password.');
          } else {
            alert(errorMessage);
          }
          console.log(error);
          // [END_EXCLUDE]
        });
        // [END authwithemail]
      }
    }


  //   function addHours(h) {    
  //     this.setTime(this.getTime() + (h*60*60*1000)); 
  //     return this;   
  //  }
  
   
        
    function handleSignUp(db) {

      var email = document.getElementById('email').value;
      var password = document.getElementById('password').value;
   
      if (email.length < 4) {
        alert('Please enter an email address.');
        return;
      }
      if (password.length < 4) {
        alert('Please enter a password.');
        return;
      }

      var nme = document.getElementById("photo");

      if(nme.value.length < 4) {
        alert('Must Select any of your photo for upload!');
        nme.focus();
        return ;
    }
    
    
      var name=document.getElementById('name').value;
      var description = document.getElementById('opis').value;
      var choosenGender = document.querySelector('input[name="gender"]:checked').value;  
      var wantedGender = document.querySelector('input[name="wantedGender"]:checked').value;


    
      
firebase.auth().createUserWithEmailAndPassword(email, password).then(function(){
  var user = firebase.auth().currentUser;
 
  user.sendEmailVerification().then(function()
  {
    console.log("EMail wysłany");
  })

  firebase.auth().onAuthStateChanged(function(user) {

    if(user)
    {
      console.log("id z : ",user.uid);
      const ref = firebase.storage().ref("profileImages");
const file = document.querySelector("#photo").files[0];
const metadata = {
contentType: file.type
};

console.log(nme.value);

const task = ref.child(user.uid).put(file, metadata);
task
.then(snapshot => snapshot.ref.getDownloadURL())
.then(url => {
db.collection("users").doc(user.uid).set({
name: name,
gender: choosenGender,
lookingFor : wantedGender,
aboutMe:description,
lastLocation:"default",
profileImageUrl: url

})
  //getLocation(db,user.uid);
  // console.log("Document successfully written!");
  //   window.alert("Registered ");
  //   window.location.replace("index.html");

}).catch(console.error);

//getLocation(db,user.uid);
    }
    getLocation(db,user.uid);

  });
    
    // [END createwithemail]
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
     

    function getLocation(db,id)
    {
      

      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const pos = {
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            };
            let data = {
              lastLocation: new firebase.firestore.GeoPoint(pos.lat,pos.lng)
            };
            
            db.collection("users").doc(id).update(data).then(function(){
            console.log("wartosc zapisana");

          })
                    
          });
        }

    }
    function resetPassword(email)
    {
      var auth = firebase.auth();
      
      auth.sendPasswordResetEmail(email).then(function() {
        // Email sent.
      }).catch(function(error) {
        // An error happened.
      });
    }
   
 

    function logout(){
      firebase.auth().signOut();
      window.location.replace("index.html");
    }

    function uploadImage(db) {
      var user = firebase.auth().currentUser;

      const ref = firebase.storage().ref("profileImages");
      const file = document.querySelector("#photo").files[0];
      const name = +new Date() + "-" + file.name;
      const metadata = {
        contentType: file.type
      };
      const task = ref.child(user.uid).put(file, metadata);
      task
        .then(snapshot => snapshot.ref.getDownloadURL())
        .then(url => {
          console.log(url);
      
         db.collection("users").doc(user.uid).update({
            profileImageUrl: url
        })
          document.querySelector("#image").src = url;
       
        })
  
        .catch(console.error);

      
  
    }

 
    function loadFirstPhoto(db)
    {
     

            db.collection("users").get().then(function(querySnapshot) {
              var index=0;
                querySnapshot.forEach(function(doc) {
                  usersMap.set(index,doc.data().profileImageUrl);
                  index++;
               });
                
               for (let [key, value] of usersMap) {
                console.log(key + ' = ' + value)
              }
              console.log("4= "+usersMap.get(4));
              var docRef = db.collection("users").doc()
              docRef.get().then(function(doc) {
              if (doc.exists) {
                  //console.log("id: "+ doc.id+ "Document data:", doc.data().profileImageUrl);
                 document.getElementById("card").style.backgroundImage="url("+doc.data().profileImageUrl+")"; 
               index++;
                } else {
                  // doc.data() will be undefined in this case
                  console.log("No such document!");
              }
          }).catch(function(error) {
              console.log("Error getting document:", error);
          });
            });
           
    
      
    }

    function loadPhoto()
    {
      var user=firebase.auth().currentUser;
      var docRef = db.collection("users").doc(user.uid)
docRef.get().then(function(doc) {
    if (doc.exists) {
      document.getElementById("mySidebarRight").style.backgroundImage="url("+doc.data().profileImageUrl+")";

    } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
    }
}).catch(function(error) {
    console.log("Error getting document:", error);
});
    }

  
    

    function mainFunction()
    {

      var us = firebase.auth().currentUser;
		firebase.auth().onAuthStateChanged(function(us) {
			if(us)
			{
				var aaRef = db.collection("users").doc(us.uid);
aaRef.get().then(function(doc) {
    if (doc.data().profileImageUrl=="default") {
		window.alert("dodaj zdjecie");
    } else {

		console.log("jest");
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
     var userLookingFor=document.getElementById("userWantedGender").textContent;
     var foo = document.getElementById("card");

     var reportButton=document.createElement("button");
     var reportButtonText=document.createTextNode("REPORT");
     reportButton.appendChild(reportButtonText);
     reportButton.className="reportButton";
     reportButton.id="report";
     foo.appendChild(reportButton);



     var elementLeft = document.createElement("button");
     var leftButton = document.createTextNode("");
     elementLeft.appendChild(leftButton);
     elementLeft.className = "leftbutton";

     foo.appendChild(elementLeft);


     var elementRight = document.createElement("button");
     var rightButton = document.createTextNode("");
     elementRight.appendChild(rightButton);
     elementRight.className = "rightbutton";

     foo.appendChild(elementRight);
		
     db.collection("users").get()
     .then(function(querySnapshot) {
         querySnapshot.forEach(function(doc) {
             // doc.data() is never undefined for query doc snapshots
         //	console.log(doc.id, " => ", doc.data().profileImageUrl);
             myArray.push(doc.data().profileImageUrl);
             idArray.push(doc.id);
             var user = firebase.auth().currentUser;
            
      
              console.log(idArray.length);

              var x = document.createElement("LABEL");
              x.id="labelForDistance";
              foo.appendChild(x);

             const usersRef = db.collection("users").doc(doc.id).collection("SwipedBy").doc(user.uid)
                     usersRef.get().then((docSnapshot) => {
                       console.log(doc.id);
                     
                      var distance=document.getElementById("labelForDistance").textContent;
                      var wantedDistance=document.getElementById("textInput").value;
                         if (!docSnapshot.exists&&doc.id!=user.uid&&doc.data().gender==userLookingFor) { 

                           console.log(doc.data().gender,userLookingFor);
                          console.log("doc.id",doc.data());
          notSwipedArray.push(doc.id);
          console.log(distance);
          distanceArray.push(distance);
         console.log(doc.id);
          console.log("Nie istnieje sobie");  
       
          const photoRef = db.collection("users").doc(doc.id);
                     photoRef.get().then((docSnapshot) => {
                         if (docSnapshot.exists) { 
                                       
                          photoArray.push(doc.data().profileImageUrl);
                          nameArray.push(doc.data().name);
                          descriptionArray.push(doc.data().description);
                          genderArray.push(doc.data().gender);
                          lookingForArray.push(doc.data().lookingFor);

                          console.log(doc.id," ",doc.data().profileImageUrl);

                              console.log(notSwipedArray.length);
                              var index=0;
                             
                             // console.log(userLookingFor,genderArray[index]);

                             
                              document.getElementById("card").style.backgroundImage="url("+photoArray[index]+")";
                            //  document.getElementById("lgabelForDistance").innerHTML=distanceArray[index];
                            getUserDistance(notSwipedArray[index]);
                            document.getElementById("userNameData").innerHTML=nameArray[index];
                              document.getElementById("userDescriptionData").innerHTML=descriptionArray[index];
                              document.getElementById("userGenderData").innerHTML=genderArray[index];
                              document.getElementById("userWantedGenderData").innerHTML=lookingForArray[index];
                             
                          console.log("index=",index);

                              document.getElementById("report").onclick=function()
                              {           
                                var reportArray=[];
                                const t = firebase.firestore.Timestamp.fromDate(new Date());
                                      const d = t.toDate();
                    
                                  db.collection("users").doc(notSwipedArray[index]).collection("Reports").get().then(function(querySnapshot) {
                                    querySnapshot.forEach(function(doc) {
                                        // doc.data() is never undefined for query doc snapshots
                                        reportArray.push(doc.id);
                                    });

                                    var reportCount=0;
                                    console.log("dlugosc tablicy: ",reportArray.length);
                                    if(reportArray.length==0)
                                    {
                                      
                                      
                                      db.collection("users").doc(notSwipedArray[index]).collection("Reports").doc().set({
                                        ReportedBy:user.uid,
                                        Reason:"Photo",
                                        Time:d

                                      });
                                      reportCount++;
                                      
                                    }
                                    else
                                    {

                                      db.collection("users").doc(notSwipedArray[index]).collection("Reports").where("ReportedBy","==",user.uid).where("Reason","==","Photo")
                                                .get()
                                                .then(function(querySnapshot) {
                                                    querySnapshot.forEach(function(doc) {
                                                        // doc.data() is never undefined for query doc snapshots
                                                        reportCount++;
                                                    });
                                                    if(reportCount<1)
                                                    {
                                                      db.collection("users").doc(notSwipedArray[index]).collection("Reports").doc().set({
                                                        ReportedBy:user.uid,
                                                        Reason:"Photo",
                                                        Time:d
                                                      });
                                                    }
                                                    else
                                                    {
                                                      console.log("Juz byl reportowany");
                                                    }
                                                })
                                                .catch(function(error) {
                                                    console.log("Error getting documents: ", error);
                                                });

                                      
                                         
                                       
                                       console.log("Report count",reportCount);
                                    }
                                    
                                  
                                  
                              })
                              .catch(function(error) {
                                  console.error("Error writing document: ", error);
                              });
                              }
                              console.log(notSwipedArray[index]);
                           


                              elementRight.onclick = function() {

  if(index<notSwipedArray.length && notSwipedArray[index]!=user.uid)
  { 
    console.log("cos tam:",notSwipedArray[index]);

    getUserDistance(notSwipedArray[index+1]);

      document.getElementById("card").style.backgroundImage="url("+photoArray[index+1]+")";
      document.getElementById("userNameData").innerHTML=nameArray[index+1];
      document.getElementById("userDescriptionData").innerHTML=descriptionArray[index+1];
      document.getElementById("userGenderData").innerHTML=genderArray[index+1];
      document.getElementById("userWantedGenderData").innerHTML=lookingForArray[index+1];
   
     
    console.log("Przesunales w prawo: "+notSwipedArray[index]);

    db.collection("users").doc(notSwipedArray[index]).collection("SwipedBy").doc(user.uid).set({
           swipe:true,
           swiped:user.uid
        })
        db.collection("users").doc(user.uid).collection("SwipedBy").doc(notSwipedArray[index]).get()
            .then((docSnapshot) => {
              if(docSnapshot.exists)
              {
              console.log("Przed zapisaniem:", notSwipedArray[index-1]);
              console.log(user.uid);
              var dataSwipe=docSnapshot.data().swipe;
              console.log(dataSwipe);
          if (docSnapshot.exists && notSwipedArray[index-1]!=user.uid && dataSwipe==true) 
          {  
            console.log("Zapisywany:",notSwipedArray[index-1]);
            db.collection("Matches").doc().set({
          id2: notSwipedArray[index-1],
          id1:user.uid
        })
          }
        }
        else
        {
          console.log("Jeszcze nie zostales przez niego przesuniety");
        }
          });          

index++;
  

      }


else{
  window.alert("Koniec zdjec");
         index++;

}
 
      }

      elementLeft.onclick = function() {
      
        if(index<notSwipedArray.length && notSwipedArray[index]!=user.uid)
        {
            document.getElementById("card").style.backgroundImage="url("+photoArray[index+1]+")";
            document.getElementById("userNameData").innerHTML=nameArray[index+1];
            document.getElementById("userDescriptionData").innerHTML=descriptionArray[index+1];
            document.getElementById("userGenderData").innerHTML=genderArray[index+1];
            document.getElementById("userWantedGenderData").innerHTML=lookingForArray[index+1];
            getUserDistance(notSwipedArray[index+1]);
               
           
          console.log("Przesunales w lewo: "+notSwipedArray[index]);
      
          db.collection("users").doc(notSwipedArray[index]).collection("SwipedBy").doc(user.uid).set({
                 swipe:false,
                 swiped:user.uid
              })                    
      
      index++;
        
      
            }
      
      
      else{
        window.alert("Koniec zdjec");
               index++;
      
      }
       
            }
          
                       
                      
                     i++;
                  

    }
    else if(docSnapshot.exists)
    {
      console.log(i); 
        console.log("istnieje");
        i++;
    }
                     });

          

                              
               
            
          
             
 
      
             
                         }
     })
                     
 })
     })
     .catch(function(error) {
         console.log("Error getting documents: ", error);
     });


    }
})
			}
		
		})

	

  function calcCrow(lat1, lon1, lat2, lon2) 
    {
      var R = 6371; // km
      var dLat = toRad(lat2-lat1);
      var dLon = toRad(lon2-lon1);
      var lat1 = toRad(lat1);
      var lat2 = toRad(lat2);

      var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
        Math.sin(dLon/2) * Math.sin(dLon/2) * Math.cos(lat1) * Math.cos(lat2); 
      var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
      var d = R * c;
      return d;
    }

    // Converts numeric degrees to radians
    function toRad(Value) 
    {
        return Value * Math.PI / 180;
	}

	function getUserDistance(id)
		{
			var user=firebase.auth().currentUser;
			var docRef = db.collection("users").doc(user.uid);
docRef.get().then(function(doc) {
    if (doc.exists) {
		console.log("Document data:", doc.data().lastLocation.latitude);
		console.log("Document data:", doc.data().lastLocation.longitude);
		var currentUserLat=doc.data().lastLocation.latitude;
		var currentUserLong=doc.data().lastLocation.longitude;

		var secondRef = db.collection("users").doc(id);
secondRef.get().then(function(doc) {
    if (doc.exists) {
		console.log("Document data:", doc.data().lastLocation.latitude);
		console.log("Document data:", doc.data().lastLocation.longitude);
		var secondUserLat=doc.data().lastLocation.latitude;
		var secondUserLong=doc.data().lastLocation.longitude;
		document.getElementById("labelForDistance").innerHTML=calcCrow(currentUserLat,currentUserLong,secondUserLat,secondUserLong);

    } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
    }
}).catch(function(error) {
    console.log("Error getting document:", error);
});


    } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
    }
}).catch(function(error) {
    console.log("Error getting document:", error);
});
		}

    }

    function chatFunction()
    {
      var user = firebase.auth().currentUser;
		firebase.auth().onAuthStateChanged(function(user) {
	  if (user) {
		console.log("Zalogowany"+user.uid);
		var usersArray=[];
		var matchId=[];
		var sendId=[];
		db.collection("Matches").get().then(function(querySnapshot) {
		querySnapshot.forEach(function(doc) {
			var swipedId;
			// doc.data() is never undefined for query doc snapshots
			if(doc.data().id1==user.uid)
			{
			swipedId=doc.data().id2;
			usersArray.push(swipedId);
			console.log("para z : ", swipedId);
			console.log(doc.id);
			matchId.push(doc.id);
			sendId.push(doc.id);

			}
			else if(doc.data().id2==user.uid)
			{
				swipedId=doc.data().id1;
				usersArray.push(swipedId);
				console.log("para z: ",swipedId);
				console.log(doc.id);
				matchId.push(doc.id);
				sendId.push(doc.id);

			}
		
		});

	var matchArray=[];

		for(var value of usersArray)
		{
			console.log(" dana z tabeli: ",value);
			var docRef = db.collection("users").doc(value);
			docRef.get().then(function(doc) {
		if (doc.exists) {
			console.log(doc.id, "Document data:", doc.data());
			matchArray.push(doc.data().profileImageUrl);

			/*var elementLeft = document.createElement("button");
	   var leftButton = document.createTextNode("User 1");
	   elementLeft.appendChild(leftButton);
	   elementLeft.id="buttonImage";

			var foo = document.getElementById("matchesCard");
		  foo.appendChild(elementLeft);
		  document.getElementById("buttonImage").style.backgroundImage="url("+doc.data().profileImageUrl+")";
		  document.getElementById("buttonImage").style.borderRadius="50%";
		  document.getElementById("buttonImage").style.height="200px";
		  document.getElementById("buttonImage").style.width="200px";
		  document.getElementById("buttonImage").style.backgroundSize="cover";
*/			console.log(usersArray.length);


function myFunction(id) {

	document.getElementById(matchId[id]).onclick = function()
		  {	

			  console.log(id);
        console.log(matchId[id]);
        console.log("user",usersArray[id]);
			document.getElementById("usersCard").innerHTML = "";
			document.getElementById("usersCard").style.overflow="auto";
      document.getElementById("usersCard").style.display = "block";
      
      var foo2 = document.getElementById("usersCard");
        //DODALEM TUTAJ KLASY!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
      var chatInputDiv=document.createElement("div");
      chatInputDiv.className="chatInputDiv";
    
      var input = document.createElement("input");
      input.type = "text";  //A NIE "textarea"?
      input.className = "ChatTextarea";
      input.id = id - 1;
        chatInputDiv.appendChild(input);

      var sendButton = document.createElement("button");
      sendButton.id = id + 1;
      sendButton.className = "ChatSendButton";
       chatInputDiv.appendChild(sendButton);

      var chatExitDiv=document.createElement("div");
      chatExitDiv.className="chatExitDiv";
        
        var chatReportButton=document.createElement("button");
        chatReportButton.id="reportButton";
        chatReportButton.textContent="report";
        chatReportButton.className="reportButtonClass";
        chatExitDiv.appendChild(chatReportButton);

      var closeButton = document.createElement("button");
      closeButton.id = id - 1000;
      closeButton.textContent = 'X';
      closeButton.className = "ChatExitButton";

      var imageButton=document.createElement("button");
      imageButton.id=id+1000;
      imageButton.className="imageButton";
      chatExitDiv.appendChild(imageButton);
      chatExitDiv.appendChild(closeButton);

      var messagesDiv=document.createElement("div");
      messagesDiv.className="messagesDiv";
    

      var nameLabel=document.createElement("label");
      nameLabel.id=id-10000;
      nameLabel.className = "ChatNameLabel";
      chatExitDiv.appendChild(nameLabel);

	var nameRef = db.collection("users").doc(usersArray[id]);
        nameRef.get().then(function(doc) {
          if (doc.exists) {
            nameLabel.textContent=doc.data().name;
            console.log(doc.data().name);
          }
        });


      

      foo2.appendChild(chatInputDiv);
      foo2.appendChild(chatExitDiv);
      foo2.appendChild(messagesDiv);


      document.getElementById(id+1000).style.backgroundImage = "url(" + matchArray[id] + ")";

      document.getElementById("reportButton").onclick=function()
      {
                
          var reportArray=[];
          var reportValue=0;

          const t = firebase.firestore.Timestamp.fromDate(new Date());
                const d = t.toDate();
            db.collection("users").doc(usersArray[id]).collection("Reports").get().then(function(querySnapshot) {
              querySnapshot.forEach(function(doc) {
                  // doc.data() is never undefined for query doc snapshots
                reportValue++;
                console.log("Tyle ma reportów",reportValue);
                  reportArray.push(doc.id);
              });

              var reportCount=0;
              console.log("dlugosc tablicy: ",reportArray.length);
              if(reportArray.length==0)
              {
                
                
                db.collection("users").doc(usersArray[id]).collection("Reports").doc().set({
                  ReportedBy:user.uid,
                  Reason:"Messages",
                  Time:d

                });
                reportCount++;
                
              }
              else
              {

                db.collection("users").doc(usersArray[id]).collection("Reports").where("ReportedBy","==",user.uid).where("Reason","==","Messages")
                          .get()
                          .then(function(querySnapshot) {
                              querySnapshot.forEach(function(doc) {
                                  // doc.data() is never undefined for query doc snapshots
                                  reportCount++;
                              });
                              if(reportCount<1)
                              {
                                db.collection("users").doc(usersArray[id]).collection("Reports").doc().set({
                                  ReportedBy:user.uid,
                                  Reason:"Messages",
                                  Time:d
                                });
                              }
                              else
                              {
                                console.log("Juz byl reportowany");
                              }
                          })
                          .catch(function(error) {
                              console.log("Error getting documents: ", error);
                          });

                
                   
                 
                 console.log("Report count",reportCount);
              }
              
            
            
        })
        .catch(function(error) {
            console.error("Error writing document: ", error);
        });
        
      }

			document.getElementById(id-1000).onclick=function()
			{
				
				var x = document.getElementById("usersCard");
				if (x.style.display === "none")
				 {
   				 x.style.display = "block";
				  } 
				  else
				  {
   				 x.style.display = "none";
  					}


			}

		  document.getElementById(id+1).onclick = function()
		  {

			const t = firebase.firestore.Timestamp.fromDate(new Date());
			const d = t.toDate();
        
var rt = document.createTextNode(document.getElementById(id-1).value);
var dk = document.createElement("div");
dk.className="container";

dk.appendChild(rt);
messagesDiv.appendChild(dk);

        
db.collection("Matches").doc(matchId[id]).collection("Messages").doc().set({
    content: document.getElementById(id-1).value,
    writerId:user.uid,
	writed:d
})

				 

		  }

	
			  
			db.collection("Matches").doc(matchId[id]).collection("Messages").orderBy('writed','asc').get().then(function(querySnapshot) {
		querySnapshot.forEach(function(doc) {
			console.log(id);
			console.log(doc.data().writerId);
			if(doc.data().writerId==user.uid)
			{
				var element = document.createElement("div");
				element.className="container";
				var foo = document.getElementById("usersCard");
				var t = document.createTextNode(doc.data().content);     // Create a text node
        element.appendChild(t);
      
        messagesDiv.appendChild(element);
        foo.appendChild(messagesDiv);
				  
			}
			else
			{
				var element = document.createElement("div");
				element.className="container darker";
				var foo = document.getElementById("usersCard");
				var t = document.createTextNode(doc.data().content);     // Create a text node
        element.appendChild(t);
        
      
        messagesDiv.appendChild(element);
        foo.appendChild(messagesDiv);
			}

			
		});
	});
}
}

      
  const result = document.querySelectorAll('#matchesDiv button').length;
  
  if(result<usersArray.length)
  {
    console.log("tyle",result)

  var element = document.createElement("button");
  db.collection("Matches").doc(matchId[result]).collection("Messages").orderBy('writed','desc').limit(1).get().then(function(querySnapshot) {
		querySnapshot.forEach(function(doc) {
      console.log(doc.id);
      console.log(doc.data().writerId);
      var t = document.createTextNode(doc.data().content);
      element.appendChild(t);

      var getNameRef = db.collection("users").doc(doc.data().writerId);

getNameRef.get().then(function(doc) {
    if (doc.exists) {
        console.log("Document data:", doc.data().name);
        var t = document.createTextNode(doc.data().name);
        element.appendChild(t)
    } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
    }
}).catch(function(error) {
    console.log("Error getting document:", error);
});

    });
  });
  element.id = matchId[result];
  element.className = "SidebardPhotoPictures";
  var foo = document.getElementById("mySidenav");
  matchesDiv.appendChild(element);
  foo.appendChild(matchesDiv);
  document.getElementById(matchId[result]).style.backgroundImage = "url(" + matchArray[result] + ")";

  document.getElementById(matchId[result]).addEventListener("click", myFunction(result));
  }

	  
			
		} else {
			// doc.data() will be undefined in this case
			console.log("No such document!");
    }
    
	}).catch(function(error) {
		console.log("Error getting document:", error);
  });
  
		}
	
		
	});
	} else {
    console.log("zaloguj sie");
    window.location.replace("index.html");
  	  }
	});
    }

