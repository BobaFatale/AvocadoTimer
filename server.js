const express = require('express');
const app = express();
const config = require('./config.js');
const admin = require("firebase-admin");
const sgMail = require('@sendgrid/mail');

sgMail.setApiKey(config.SENDGRID_API_KEY);

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
		item.id = key;
		if (item.ripeDate <= plusOne) {
			todayEmails.push(item);
		}
	}
	console.log(todayEmails);
	sendEmails(todayEmails);
}

const sendEmails = (emailList) => {
	emailList.map((item) => {
		const msg = {
		  to: 'juneanddog@gmail.com',
		  from: {
		  	email:'noreply@guacr.com',
		  	name:'Guacr Notifications'
		  },
		  subject: 'Your Avocado is Ripe',
		  text: `Hi ${item.username},
		  Your Avocado ${item.name} is ripe! Don't forget to eat it today!`,
		  html: `Hi ${item.username},<br>
		  <strong>Your Avocado ${item.name} is ripe! Don't forget to eat it today!</strong>`,
		};
		// sgMail.send(msg);
	})
}

app.get("/",(req,res) => {
	res.send('hello');
});

app.listen(3500);