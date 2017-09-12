const express = require('express');
const app = express();
const admin = require("firebase-admin");

var serviceAccount = require("./avocadotimer-firebase-adminsdk-yhkom-7dba4dd1ef.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://avocadotimer.firebaseio.com"
});

const db = admin.database();
const ref = db.ref("/App/pendingEmails/");
ref.once("value", function(snapshot) {
  console.log(snapshot.val());
});

app.get("/",(req,res) => {
	res.send('hello');
});

app.listen(3500);