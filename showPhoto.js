var usersMap=new Map();

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
    var docRef = db.collection("users").doc(usersMap.get(4));
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
 