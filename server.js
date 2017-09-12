const express = require('express');
const app = express();
const admin = require("firebase-admin");

var serviceAccount = require("./avocadotimer-firebase-adminsdk-yhkom-7dba4dd1ef.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://avocadotimer.firebaseio.com"
});

const db = admin.database();
const pendRef = db.ref("/App/pendingEmails/");
const sentRef = db.ref("/App/sentEmails/");
let dbVal = {};
let todayEmails = [];

pendRef.on("value", (snapshot) => {
  dbVal = snapshot.val();
  getEmails(dbVal);
}, (errorObject) => {
  console.log("The read failed: " + errorObject.code);
});

const getEmails = (dbVal) => {
	const now = new Date();
	const currentTime = now.getTime();
	const plusOne = currentTime + 86400000;
	todayEmails = [];
	for (key in dbVal){
		const item = dbVal[key];
		if (item.ripeDate <= plusOne) {
			todayEmails.push(item);
		}
	}
	console.log(todayEmails);
}

app.get("/",(req,res) => {
	res.send('hello');
});

app.listen(3500);