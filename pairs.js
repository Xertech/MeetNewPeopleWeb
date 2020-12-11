var messagesDiv=document.createElement("div");
messagesDiv.className="messagesDiv";

function chatFunction()
{
   var chatReportButton=document.createElement("button");
    chatReportButton.id="reportButton";
    chatReportButton.textContent="";
    chatReportButton.className="reportButtonPair";
    
    var deletePair=document.createElement("button");
    deletePair.id="deletePair";
    deletePair.textContent="";
    deletePair.className="deletePair";
    var reportDiv=document.getElementById("containerProfile");
    reportDiv.appendChild(deletePair);

    reportDiv.appendChild(chatReportButton);
      
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
	console.log(usersArray.length);


function myFunction(id) {

document.getElementById(matchId[id]).onclick = function()
      {	

  console.log(doc.id);
  console.log(matchId[id]);
  messagesDiv.innerHTML="";
  document.getElementById("usersCard").innerHTML = "";
  document.getElementById("usersCard").style.overflow="auto";
  document.getElementById("usersCard").style.display = "block";
  
  var foo2 = document.getElementById("usersCard");
  var chatInputDiv=document.createElement("div");
  chatInputDiv.className="chatInputDiv";



  var input = document.createElement("input");
  input.type = "text";  //A NIE "textarea"?
  input.className = "ChatTextarea";
  input.id = id - 1;
  input.autocomplete="off";

    chatInputDiv.appendChild(input);

  var sendButton = document.createElement("button");
  sendButton.id = id + 1;
  sendButton.className = "ChatSendButton";
   chatInputDiv.appendChild(sendButton);
      

  var chatExitDiv=document.createElement("div");
  chatExitDiv.className="chatExitDiv";
    
  var closeButton = document.createElement("button");
  closeButton.id = id - 1000;
  closeButton.textContent = 'X';
  closeButton.className = "ChatExitButton";

  var imageButton=document.createElement("button");
  imageButton.id=id+1000;
  imageButton.className="imageButton";
  chatExitDiv.appendChild(imageButton);
  chatExitDiv.appendChild(closeButton);

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

  var modalProfile = document.getElementById("profileModal");
  var btnProfile = document.getElementById(id+1000);
  var spanProfile = document.getElementsByClassName("closeProfile")[0];

  spanProfileClose(doc.data(),modalProfile,spanProfile);
  showPairData(id,matchArray,btnProfile,doc.data());
  deleteChoosenPair(id,matchId,usersArray);

  
  var modalReport = document.getElementById("reportModal");
  var btnReport = document.getElementById("reportButton"); 
  var spanReport = document.getElementsByClassName("closeReport")[0];
  
  reportUserFromPair(btnReport,id,usersArray);

  window.addEventListener("click", function(event) {
    if (event.target == modalReport) {
      modalReport.style.display = "none";
      
    }
  });

      closeMessageDiv(id);
      sendMessage(id,matchId);
      orderMessageByDate(id,matchId);

          
        
}
}

  
const result = document.querySelectorAll('#matchesDiv button').length;

if(result<usersArray.length)
{
console.log("tyle",result)
//=========================================================================================
//matchesDiv(statusProfile (SidebardPhotoPictures, newsPairs(userNameSideNav(nazwa), newMessProfile(woadomosc)))))


var statusProfile=document.createElement("div");
statusProfile.className="statusProfile";

var newsPairs=document.createElement("div");
newsPairs.className="newsPairs";

var userNameSideNav=document.createElement("div");
userNameSideNav.className="userNameSideNav";

var newMessProfile=document.createElement("div");
newMessProfile.className="newMessProfile";
//=========================================================================================

var element = document.createElement("button");

var getNameRef = db.collection("users").doc(usersArray[result]);

getNameRef.get().then(function(doc) {
if (doc.exists) {
    console.log("Document data:", doc.data().name);
    
    var t = document.createTextNode(doc.data().name);
    userNameSideNav.appendChild(t);

} else {
    // doc.data() will be undefined in this case
    console.log("No such document!");
}
}).catch(function(error) {
console.log("Error getting document:", error);
});

db.collection("Matches").doc(matchId[result]).collection("Messages").orderBy('writed','desc').limit(1).get().then(function(querySnapshot) {
      querySnapshot.forEach(function(doc) {
        console.log(doc.id);
        console.log(doc.data().writerId);
                 
        
        var t = document.createTextNode(doc.data().content);
        newMessProfile.appendChild(t);

 

      });
});

element.id = matchId[result];
element.className = "SidebardPhotoPictures";

var mySidenav = document.getElementById("mySidenav");

newsPairs.appendChild(newMessProfile);
newsPairs.appendChild(userNameSideNav);

statusProfile.appendChild(element);
statusProfile.appendChild(newsPairs);

matchesDiv.appendChild(statusProfile);
mySidenav.appendChild(matchesDiv);

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

function reportUserFromPair(btnReport,id,usersArray)
{
  btnReport.onclick = function() {
    var modalReport = document.getElementById("reportModal");//<------------to dodałem
    modalReport.style.display = "flex";
    document.getElementById("reportForMessages").style.display="none";
    document.getElementById("hideMessages").style.display="block";
    document.getElementById("reportButtonSend").onclick=function()
  {
    if(document.getElementById("reportForPhoto").checked) {
      reportFor(id,usersArray,"Photo");              
    }
    else if(document.getElementById('reportForDescription').checked)
    {
      reportFor(id,usersArray,"Description");              
                      
    }
    else if(document.getElementById("reportForMessages").checked)
    {
      reportForMessages(id,usersArray);              
    }

    }
  }
}

function closeMessageDiv(id)
{
  
  document.getElementById(id-1000).onclick=function()
  {

      var x = document.getElementById("usersCard");
      if (x.style.display === "none")
       {
          x.style.display = "block";
          document.getElementById("userNameProfile").style.visibility = "hidden";
          document.getElementById("userDescriptionProfile").style.visibility = "hidden";
          document.getElementById("userGenderProfile").style.visibility = "hidden";

        } 
        else
        {
          x.style.display = "none";
            }


  }
}

function sendMessage(id,matchId)
{
  document.getElementById(id+1).onclick = function()
  {
    var user = firebase.auth().currentUser;


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

document.getElementById(id-1).value="";
         

  }
}

function orderMessageByDate(id,matchId)
{
  var user = firebase.auth().currentUser;
  db.collection("Matches").doc(matchId[id]).collection("Messages").orderBy('writed','asc').get()
        .then(function(querySnapshot) {
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
     element.focus();     
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
    element.focus();     

    messagesDiv.appendChild(element);
    foo.appendChild(messagesDiv);
        }

        
    });
});
}

function reportFor(id,usersArray,reason)
{
  var user = firebase.auth().currentUser;

  var reportArray=[];
      const t = firebase.firestore.Timestamp.fromDate(new Date());
     const d = t.toDate();
                   
     db.collection("users").doc(usersArray[id]).collection("Reports").get().then(function(querySnapshot) {
     querySnapshot.forEach(function(doc) {
     reportArray.push(doc.id);
                                   });
   
                                  var reportCount=0;
                                 console.log("dlugosc tablicy: ",reportArray.length);
                                    if(reportArray.length==0)
                                   {
                                     
                                     
                                      db.collection("users").doc(usersArray[id]).collection("Reports").doc().set({
                                       ReportedBy:user.uid,
                                        Reason:reason,
                                      Time:d
   
                                      });
                                      reportCount++;
                                     
                                   }
                                    else
                                    {
   
                                      db.collection("users").doc(usersArray[id]).collection("Reports").where("ReportedBy","==",user.uid).where("Reason","==",reason)
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
                                                        Reason:reason,
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

function reportForMessages(id,usersArray)
{
  var reportArray=[];
  var reportValue=0;
  var user = firebase.auth().currentUser;

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
                      else if(reportCount>=10)
                      {
                        console.log(reportCount);
                        db.collection("users").doc(usersArray[id]).collection("Reports")
                        .get()
                        .then(res => {
                          res.forEach(element => {
                            element.ref.delete();
                          });
                        });

                        db.collection("Matches").where("id1","==",usersArray[id])
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

                        db.collection("Matches").where("id2","==",usersArray[id])
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

                        db.collection("users").doc(usersArray[id]).set({
                            banned:true
                        })
                        .then(function() {
                            console.log("User zbanowany!");
                        })
                        .catch(function(error) {
                            console.error("Error writing document: ", error);
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

function deleteChoosenPair(id,matchId,usersArray)
{
  var user = firebase.auth().currentUser;

  document.getElementById("deletePair").onclick=function()
  {
    db.collection("Matches").doc(matchId[id]).delete().then(function() {
      alert("Para usnieta",matchId[id]);
    }).catch(function(error) {
      console.error("Error removing document: ", error);
  });
  db.collection("users").doc(user.uid).collection("SwipedBy").doc(usersArray[id]).delete().then(function() {
    console.log("Dane ze swipedBy usuniete");
  }).catch(function(error) {
    console.error("Error removing document: ", error);
});
db.collection("users").doc(usersArray[id]).collection("SwipedBy").doc(user.uid).delete().then(function() {
  console.log("Dane ze swipedBy usuniete");
}).catch(function(error) {
  console.error("Error removing document: ", error);
});

  }
}

window.addEventListener("click", function(event) {
  if (event.target == modalProfile) {
    document.getElementById("zmienDane").style.display="block";
    modalProfile.style.display = "none";
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        var currentUserRef = db.collection("users").doc(user.uid);
   
        currentUserRef.get().then(function(doc) {
          if (doc.exists) {
            var photoUrl=doc.data().profileImageUrl;
            document.getElementById("opisChange").innerHTML=doc.data().aboutMe;				
            document.getElementById("nameChange").value=doc.data().name;
            document.getElementById("city").value=doc.data().city;
    			  document.getElementById("job").value=doc.data().job;	
            document.getElementById("nameChange").readOnly = false;	
            document.getElementById("opisChange").readOnly = false;	
            document.getElementById("city").readOnly = false;	
            document.getElementById("job").readOnly = false;	


            if(doc.data().gender=="male")
            {
           document.getElementById("maleChange").checked=true;				
   
            }
            else
            {
           document.getElementById("femaleChange").checked=true;				
   
            }			
            document.getElementById("currentUserCardID").style.backgroundImage="url("+photoUrl+")";
            document.getElementById("containerProfile").style.visibility="visible";	
             document.getElementById("reportButton").style.visibility="hidden";	
             document.getElementById("deletePair").style.visibility="hidden";
        
            
          } else {
            // doc.data() will be undefined in this case
            console.log("No such document!");
          }
        }).catch(function(error) {
          console.log("Error getting document:", error);
        });
   
      }});
  }
});

function showPairData(id,matchArray,btnProfile,data)
{
  btnProfile.onclick = function() {
    console.log(data);
    modalProfile.style.display = "flex";
    document.getElementById("reportButton").style.visibility="visible";	
    document.getElementById("deletePair").style.visibility="visible";
    
    document.getElementById("nameChange").readOnly = true;	
    document.getElementById("opisChange").readOnly = true;	
    document.getElementById("city").readOnly = true;	
    document.getElementById("job").readOnly = true;	


    document.getElementById("city").value=data.city;
    document.getElementById("job").value=data.job;

    document.getElementById("opisChange").innerHTML=data.aboutMe;				
			   document.getElementById("nameChange").value=data.name;	
			   if(data.gender=="male")
			   {
				document.getElementById("maleChange").checked=true;				

			   }
			   else
			   {
				document.getElementById("femaleChange").checked=true;				

			   }			
	
      
    document.getElementById("currentUserCardID").style.backgroundImage="url(" + matchArray[id] + ")";
         document.getElementById("zmienDane").style.display="none";

    }
}

function spanProfileClose(data,modalProfile,spanProfile)
{
  spanProfile.onclick=function()
  {
    document.getElementById("zmienDane").style.display="block";
    modalProfile.style.display = "none";
    firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        var currentUserRef = db.collection("users").doc(user.uid);
   
        currentUserRef.get().then(function(doc) {
          if (doc.exists) {
            var photoUrl=doc.data().profileImageUrl;
            document.getElementById("opisChange").innerHTML=doc.data().aboutMe;				
            document.getElementById("nameChange").value=doc.data().name;	
            document.getElementById("city").value=doc.data().city;
    			  document.getElementById("job").value=doc.data().job;
            if(doc.data().gender=="male")
            {
           document.getElementById("maleChange").checked=true;				
   
            }
            else
            {
           document.getElementById("femaleChange").checked=true;				
   
            }			
            document.getElementById("currentUserCardID").style.backgroundImage="url("+photoUrl+")";
            document.getElementById("containerProfile").style.visibility="visible";	
  
             document.getElementById("reportButton").style.visibility="hidden";	
             document.getElementById("deletePair").style.visibility="hidden";
        
            
          } else {
            // doc.data() will be undefined in this case
            console.log("No such document!");
          }
        }).catch(function(error) {
          console.log("Error getting document:", error);
        });
   
      }});
  }
}