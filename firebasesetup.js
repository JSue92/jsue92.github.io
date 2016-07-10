  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyCEJHoCXjUvlTAl3loDasgROr1qocTu4vs",
    authDomain: "savesnippet.firebaseapp.com",
    databaseURL: "https://savesnippet.firebaseio.com",
    storageBucket: "",
  };
  firebase.initializeApp(config);

  var firebaseDB = firebase.database();

  var objectsInFirebase = firebaseDB.ref("snippet");

  // objectsInFirebase.child("-KLSLTLCEjkFku5e9A5U").remove(); - example of how to remove something 
 
  /*
  how to update a tile in the snippet. 

  */
 
 // objectsInFirebase.child("-KLXXRznsPrxDtrYIYKp").update({

 //  title: " mark update"
 // });

 