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
}, (errorObject) => {
  console.log("The read failed: " + errorObject.code);
});

//moment 
//current
//run on setTimeout first between now and midnight
//after that setinterval begins between all the rest;
const timer = setInterval(() => tick(), 3600000);

const tick = () => {
	console.log('ping');
	getEmails();
}

const getEmails = () => {
	const now = new Date();
	const currentTime = now.getTime();
	const plusOne = currentTime + 3600000;
	todayEmails = [];
	for (key in dbVal){
		const item = dbVal[key];
		item.id = key;
		if (item.ripeDate <= plusOne) {
			todayEmails.push(item);
		}
	}
	console.log(todayEmails);
	if (todayEmails.length > 0){
		sendEmails(todayEmails);
	}
}
const sendEmails = (emailList) => {
	emailList.map((item) => {
		const sentEmail = item;
		const emailRef = sentRef.child(`/${item.id}`);
		emailRef.set(item);
		const removeRef = pendRef.child(`/${item.id}`);
		removeRef.remove();
		const msg = {
			"send_at": (Math.floor(item.ripeDate/1000)),
		  "to": item.email,
		  "from": {
		  	email:'noreply@guacr.com',
		  	name:'Guacr Notifications'
		  },
		  "subject": 'Your 🥑 is Ripe',
		  "text": `Hi ${item.username},

		  Your Avocado ${item.name} is ripe! Don't forget to eat it today!

		  A friendly reminder from the AvocadoTimer by Guacr 🥑`,
		  "html": `Hi ${item.username},<br><br>
						  Your Avocado <strong>${item.name}</strong> is ripe! Don't forget to eat it today!<br><br>
						  A friendly reminder from the AvocadoTimer by Guacr 🥑`,
		};
		console.log(msg);
		sgMail.send(msg);
	})
}

app.get("/",(req,res) => {
	res.send('hello');
});

app.listen(process.env.PORT || 3500);