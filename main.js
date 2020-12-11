
function mainFunction()
{
  var us = firebase.auth().currentUser;
    firebase.auth().onAuthStateChanged(function(us) {
        if(us)
        {
            var mainUserRef = db.collection("users").doc(us.uid);
            mainUserRef.get().then(function(doc) {
      if (!doc.exists) {
    window.open('index.html','_self');
 
    } 
    else if(doc.data().lastLocation==null)
    {
      getLocation(db,us.uid);
    }
    else {
      //getLocation(db,us.uid);
      var currentUserLat=doc.data().lastLocation.latitude;
      var currentUserLong=doc.data().lastLocation.longitude;

  var foo = document.getElementById("card");
  var fooUsers=document.getElementById("dataCard");
  
  var rangeRef = db.collection("users").doc(us.uid);
  rangeRef.get().then(function(doc) {
    document.getElementById('textInput').value=doc.data().searchingRange;
    document.getElementById("textInput").readOnly = true;



});

 var notSwipedArray=[];
 var photoArray=[];
 var descriptionArray=[];
 var nameArray=[];
 var genderArray=[];
 var lookingForArray=[];
 var distanceArray=[];
 var jobarray=[];
 var cityarray=[];

 var userLookingFor=document.getElementById("userWantedGender").textContent;

 var reportButton=document.createElement("button");
 var reportButtonText=document.createTextNode("");
 reportButton.appendChild(reportButtonText);
 reportButton.className="reportButton";
 reportButton.id="report";
 foo.appendChild(reportButton);

 var elementLeft = document.createElement("button");
 var leftButton = document.createTextNode("");
 elementLeft.appendChild(leftButton);
 elementLeft.className = "leftbutton";
 foo.appendChild(elementLeft);

 var x = document.createElement("LABEL");
                   x.id="labelForDistance";
                   x.className="labelForDistance"
                   fooUsers.appendChild(x);
                   //tutuyguiy

 var elementRight = document.createElement("button");
 var rightButton = document.createTextNode("");
 elementRight.appendChild(rightButton);
 elementRight.className = "rightbutton";
 foo.appendChild(elementRight);



  
 db.collection("users").get()
 .then(function(querySnapshot) {
     querySnapshot.forEach(function(doc) {
    
         var user = firebase.auth().currentUser;
    
         const usersRef = db.collection("users").doc(doc.id).collection("SwipedBy").doc(user.uid)
                 usersRef.get().then((docSnapshot) => {
                  
                  try{
                   var secondUserLat=doc.data().lastLocation.latitude;
                   var secondUserLong=doc.data().lastLocation.longitude;                                 
                   var calcDistance=calcCrow(currentUserLat,currentUserLong,secondUserLat,secondUserLong);                                          
                  var distance=parseInt(calcDistance);
                  var wantedDistance=document.getElementById("textInput").value;
                  }
                  catch(e)
                  {
                    console.log(e);
                  }

                  document.getElementById("dataCard").style.visibility = "hidden";
                  reportButton.style.visibility="hidden";

                     if (!docSnapshot.exists&&doc.id!=user.uid&&(doc.data().gender==userLookingFor||userLookingFor=='male Female')&&(distance<wantedDistance||wantedDistance=='unlimited')&&doc.data().banned!=true) { 

                      document.getElementById("dataCard").style.visibility = "visible";
                      reportButton.style.visibility="visible";
                      document.getElementById("labelForDistance").style.visibility="visible";            
                
                      notSwipedArray.push(doc.id);
                      distanceArray.push(distance);
   
                      const photoRef = db.collection("users").doc(doc.id);
                      photoRef.get().then((docSnapshot) => {
                      if (docSnapshot.exists) { 
                      var index=0;          
                     
                      photoArray.push(doc.data().profileImageUrl);
                      cityarray.push(doc.data().city);
                      jobarray.push(doc.data().job);
                      nameArray.push(doc.data().name);
                      descriptionArray.push(doc.data().aboutMe);
                      if(doc.data().gender=="male")
                      {
                        genderArray.push("Mężczyzna");

                      }
                      else
                      {
                        genderArray.push("Kobieta");

                      }
                      lookingForArray.push(doc.data().lookingFor);

                      document.getElementById("dataCard").style.visibility = "visible";
                      reportButton.style.visibility="visible";
                      document.getElementById("labelForDistance").style.visibility="visible";
                      document.getElementById("card").style.backgroundImage="url("+photoArray[index]+")";
                      document.getElementById("labelForDistance").innerHTML=distanceArray[index];
                      document.getElementById("userNameData").innerHTML=nameArray[index];
                      document.getElementById("userCity").innerHTML=cityarray[index];
                      document.getElementById("userJob").innerHTML=jobarray[index];

                      document.getElementById("userDescriptionData").innerHTML=descriptionArray[index];
                      document.getElementById("userGenderData").innerHTML=genderArray[index];             
                      report(index,notSwipedArray);        
                                             
swipe(index,elementLeft,elementRight,distanceArray,photoArray,nameArray,descriptionArray,genderArray,notSwipedArray,jobarray,cityarray);
                                                      
}
else if(docSnapshot.exists)
{
  console.log("User already swapped");
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

}

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

function toRad(Value) 
{
    return Value * Math.PI / 180;
}

function swipe(index,elementLeft,elementRight,distanceArray,photoArray,nameArray,descriptionArray,genderArray,notSwipedArray,jobarray,cityarray)
{
  var user=firebase.auth().currentUser;
  elementRight.onclick = function() {

    if(index<notSwipedArray.length && notSwipedArray[index]!=user.uid)
    { 
    
      document.getElementById("labelForDistance").innerHTML=distanceArray[index+1];
      document.getElementById("card").style.backgroundImage="url("+photoArray[index+1]+")";
      document.getElementById("userNameData").innerHTML=nameArray[index+1];
      document.getElementById("userDescriptionData").innerHTML=descriptionArray[index+1];
      document.getElementById("userGenderData").innerHTML=genderArray[index+1];
      document.getElementById("userCity").innerHTML=cityarray[index+1];
      document.getElementById("userJob").innerHTML=jobarray[index+1];
    db.collection("users").doc(notSwipedArray[index]).collection("SwipedBy").doc(user.uid).set({
           swipe:true,
           swiped:user.uid
        })
        db.collection("users").doc(user.uid).collection("SwipedBy").doc(notSwipedArray[index]).get()
            .then((docSnapshot) => {
              if(docSnapshot.exists)
              {

              var dataSwipe=docSnapshot.data().swipe;
          if (docSnapshot.exists && notSwipedArray[index-1]!=user.uid && dataSwipe==true) 
          {  
            db.collection("Matches").doc().set({
          id2: notSwipedArray[index-1],
          id1:user.uid
        })
          }
        }
        else
        {
          console.log("Swiped");
        }
          });          
    
    index++;
      
      }
    
    
    else{
    window.alert("Koniec zdjec");
    document.getElementById("dataCard").style.visibility = "hidden";
    reportButton.style.visibility="hidden";
    document.getElementById("labelForDistance").style.visibility="hidden";
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
            document.getElementById("labelForDistance").innerHTML=distanceArray[index+1];
            document.getElementById("userCity").innerHTML=cityarray[index+1];
            document.getElementById("userJob").innerHTML=jobarray[index+1];
          db.collection("users").doc(notSwipedArray[index]).collection("SwipedBy").doc(user.uid).set({
                 swipe:false,
                 swiped:user.uid
              })                    
      
      index++;
      
            }
      
      
      else{
        document.getElementById("dataCard").style.visibility = "hidden";
        reportButton.style.visibility="hidden";
        document.getElementById("labelForDistance").style.visibility="hidden";
               index++;
      
      }
       
            }
}

function report(index,notSwipedArray)
{
  var modalReport = document.getElementById("reportModal");
  var btnReport = document.getElementById("report");
  
  var spanReport = document.getElementsByClassName("closeReport")[0];

  spanReport.onclick = function() {
    modalReport.style.display = "none";
    }

  window.addEventListener("click", function(event) {
    if (event.target == modalReport) {
      modalReport.style.display = "none";
      
    }
  });
 
  btnReport.onclick = function() {
  modalReport.style.display="flex";
    document.getElementById("reportForMessages").style.display="none";
    document.getElementById("hideMessages").style.display="none";
    document.getElementById("reportButtonSend").onclick=function()
  {
    if(document.getElementById("reportForPhoto").checked) {
      reportFor(index,notSwipedArray,"Photo");                 
    }
    else if(document.getElementById('reportForDescription').checked)
    {
      reportFor(index,notSwipedArray,"Description"); 
                      
    }
  

    }
  }
}

