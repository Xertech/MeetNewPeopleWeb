
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
            if (user&&user.banned!=true) {
              sessionStorage.setItem("AuthenticationState", "Authenticated");
              //sessionStorage.setItem("AuthenticationExpires", addHours(1));
              window.open('main.html','_self');

              //window.location.replace("main.html");
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
searchingRange:"unlimited",
banned:"false",
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

  
    

