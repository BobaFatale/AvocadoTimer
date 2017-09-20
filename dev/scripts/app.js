//future goals:
//input vailidation
//fix email send_at value
//remove avocado when it expires


import React from 'react';
import ReactDOM from 'react-dom';
import moment from 'moment';

import firebase, { auth, provider } from './components/firebase.js';
import Header from  './components/Header.js';
import AddAvocado from './components/AddAvocado.js';
import DisplayAvocado from './components/DisplayAvocado.js';
import Footer from './components/Footer.js';

const dbRef = firebase.database().ref('/App');


class App extends React.Component {
	constructor(){
		super();
		this.state = {
			avocados: [],
			userAvocados: [],
			daysToRipe: 14,
			timeOfDay: '',
			avocadoName: '',
			avocadoEmail: '',
			user: null,
			userID: '',
			checked: '',
		}
		this.handleInput = this.handleInput.bind(this);
		this.handleAdd = this.handleAdd.bind(this);
		this.removeAvocado = this.removeAvocado.bind(this);
		this.login = this.login.bind(this);
		this.logout = this.logout.bind(this);
	}
	componentDidMount(){
		firebase.auth().onAuthStateChanged((user) => {
		  if (user) {
		  	this.setState({user});
		    const userDBRef = dbRef.child(`users/${this.state.user.uid}/avocados`);
		    userDBRef.on('value', (snapshot) => {
		    	const items = snapshot.val();
		    	const newAvocadoArray = [];
		    	for (let key in items) {
		    		const firebaseItem = items[key];
		    		firebaseItem.id = key;
		    		newAvocadoArray.push(firebaseItem);
		    	}
		    	this.setState({
		    		userAvocados:newAvocadoArray,
		    	})
		    })
		  }
		});
	}
	pageLoad(){

	}	 
	login() {
	  auth.signInWithPopup(provider) 
    .then((result) => {
      const user = result.user;
      const userID = result.user.uid;
      this.setState({
        user: user,
      });
    });
	}
	logout() {
		auth.signOut()
    .then(() => {
      this.setState({
        user: null
      });
    });
	}
	handleInput(event, isRadio){
		if (isRadio === true){
			this.setState({
				checked: event.target.value
			})
		}
		this.setState({
			[event.target.name]: event.target.value,
		});
	}
	removeAvocado(key,emailKey) {
		const avocadoRef = firebase.database().ref(`App/users/${this.state.user.uid}/avocados/${key}`);
		const emailRef = firebase.database().ref(`App/pendingEmails/${emailKey}`);
		avocadoRef.remove();
		emailRef.remove();
	}
	handleAdd(event){
		event.preventDefault();
		const userDBRef = dbRef.child(`users/${this.state.user.uid}/avocados`);
		let currentTime = new Date();
		currentTime = currentTime.getTime();
		const timeToRipe = (this.state.daysToRipe * 24 * 60 * 60 * 1000);
		const finalTime = currentTime + timeToRipe;
		const ripeDate = moment(finalTime);
		ripeDate.millisecond(0);
		ripeDate.seconds(0);
		ripeDate.minutes(0);
		ripeDate.hours(this.state.timeOfDay);
		const pendRef = dbRef.child('pendingEmails')
		const newEmail = {
			name: this.state.avocadoName,
			username: this.state.user.displayName,
			email: this.state.user.email,
			ripeDate: ripeDate.valueOf(),
		}
		const pushRef = pendRef.push(newEmail);
		const pushKey = pushRef.key;
		console.log(pushKey);
		const newAvocado = {
			name: this.state.avocadoName,
			username: this.state.user.displayName,
			email: this.state.user.email,
			addTime: currentTime,
			daysToRipe: this.state.daysToRipe,
			ripeDate: ripeDate.valueOf(),
			emailKey: pushKey,
		}
		userDBRef.push(newAvocado);
		this.setState({
			daysToRipe: 14,
			timeOfDay: '',
			avocadoName: '',
			avocadoEmail: '',
			checked: '',
		})
	}
	render(){
		
		return (
			<div>
				<Header
					user={this.state.user}
					login={this.login}
					logout={this.logout}
				/>
				<AddAvocado 
					handleInput={this.handleInput}
					handleAdd={this.handleAdd}
					daysToRipe={this.state.daysToRipe}
					avocadoName={this.state.avocadoName}
					avocadoEmail={this.state.avocadoEmail}
					checked={this.state.checked}
					user={this.state.user}
					tod={this.state.timeOfDay}
				/>
				<DisplayAvocado
					avocados={this.state.userAvocados}
					removeAvocado={this.removeAvocado}
					user={this.state.user}
				/>
				<Footer />
			</div>
		)
	}
}

ReactDOM.render(<App />, document.getElementById('app'));