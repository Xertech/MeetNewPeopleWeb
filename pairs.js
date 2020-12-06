function chatFunction()
{
   var chatReportButton=document.createElement("button");
    chatReportButton.id="reportButton";
    chatReportButton.textContent="report";
    chatReportButton.className="reportButtonClass";
    
    var deletePair=document.createElement("button");
    deletePair.id="deletePair";
    deletePair.textContent="Usun pare";
    var reportDiv=document.getElementById("currentUserCardID");
    reportDiv.appendChild(deletePair);

    reportDiv.appendChild(chatReportButton);
    
    
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
	console.log(usersArray.length);


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

  var modalProfile = document.getElementById("profileModal");

  var btnProfile = document.getElementById(id+1000);
  
  var spanProfile = document.getElementsByClassName("closeProfile")[0];

  window.addEventListener("click", function(event) {
    if (event.target == modalProfile) {
      modalProfile.style.display = "none";
      firebase.auth().onAuthStateChanged(function(user) {
        if (user) {
          var currentUserRef = db.collection("users").doc(user.uid);
     
          currentUserRef.get().then(function(doc) {
            if (doc.exists) {
              var photoUrl=doc.data().profileImageUrl;
              document.getElementById("opisChange").innerHTML=doc.data().description;				
              document.getElementById("nameChange").value=doc.data().name;	
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
  spanProfile.onclick=function()
  {
    modalProfile.style.display = "none";

    var user = firebase.auth().currentUser;
    firebase.auth().onAuthStateChanged(function(user) {
    if (user) {
      var currentUserRef = db.collection("users").doc(user.uid);
 
      currentUserRef.get().then(function(doc) {
        if (doc.exists) {
          var photoUrl=doc.data().profileImageUrl;
          
          document.getElementById("opisChange").innerHTML=doc.data().description;				
          document.getElementById("nameChange").value=doc.data().name;	
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
 
  btnProfile.onclick = function() {
    modalProfile.style.display = "block";
    document.getElementById("reportButton").style.visibility="visible";	
    document.getElementById("deletePair").style.visibility="visible";

    var photoUrl=doc.data().profileImageUrl;
			   document.getElementById("opisChange").innerHTML=doc.data().description;				
			   document.getElementById("nameChange").value=doc.data().name;	
			   if(doc.data().gender=="male")
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




  
  var modalReport = document.getElementById("reportModal");

  var btnReport = document.getElementById("reportButton");
  
  var spanReport = document.getElementsByClassName("closeProfile")[0];

  window.addEventListener("click", function(event) {
    if (event.target == modalReport) {
      modalReport.style.display = "none";
      
    }
  });


 
  btnReport.onclick = function() {
    modalReport.style.display = "block";
    document.getElementById("reportForMessages").style.display="block";
    document.getElementById("hideMessages").style.display="block";
    document.getElementById("reportButtonSend").onclick=function()
  {
    if(document.getElementById("reportForPhoto").checked) {
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
                                        Reason:"Photo",
                                      Time:d
   
                                      });
                                      reportCount++;
                                     
                                   }
                                    else
                                    {
   
                                      db.collection("users").doc(usersArray[id]).collection("Reports").where("ReportedBy","==",user.uid).where("Reason","==","Photo")
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
    else if(document.getElementById('reportForDescription').checked)
    {
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
                                        Reason:"Description",
                                      Time:d
   
                                      });
                                      reportCount++;
                                     
                                   }
                                    else
                                    {
   
                                      db.collection("users").doc(usersArray[id]).collection("Reports").where("ReportedBy","==",user.uid).where("Reason","==","Description")
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
                                                        Reason:"Description",
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
    else if(document.getElementById("reportForMessages").checked)
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
  

    }
  }
     
  

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

document.getElementById(id-1).value="";
             

      }


          
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

