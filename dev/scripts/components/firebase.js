import firebase from 'firebase';

// Initialize Firebase
var config = {
  apiKey: "AIzaSyCWPGEuOaPQAeokX-L40BpQ-zHPS2vI0VY",
  authDomain: "avocadotimer.firebaseapp.com",
  databaseURL: "https://avocadotimer.firebaseio.com",
  projectId: "avocadotimer",
  storageBucket: "avocadotimer.appspot.com",
  messagingSenderId: "402733858725"
};
firebase.initializeApp(config);

export default firebase;