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