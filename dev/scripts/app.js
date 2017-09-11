import React from 'react';
import ReactDOM from 'react-dom';
import moment from 'moment';

import firebase, { auth, provider } from './components/firebase.js';
import Header from  './components/Header.js';
import AddAvocado from './components/AddAvocado.js';
import DisplayAvocado from './components/DisplayAvocado.js'

const dbRef = firebase.database().ref('/avocados');

class App extends React.Component {
	constructor(){
		super();
		this.state = {
			avocados: [],
			daysToRipe: 1,
			timeOfDay: '',
			avocadoName: '',
			avocadoEmail: '',
			user: null,
			userID: '',
		}
		this.handleInput = this.handleInput.bind(this);
		this.handleAdd = this.handleAdd.bind(this);
		this.login = this.login.bind(this);
		this.logout = this.logout.bind(this);
	}
	componentDidMount(){
		console.log('Engaged');
		dbRef.on('value', (snapshot) => {
			const items = snapshot.val();
			const newAvocadoArray = [];
			for (let key in items) {
				const firebaseItem = items[key];
				firebaseItem.id = key;
				newAvocadoArray.push(firebaseItem);
			}
			this.setState({
				avocados:newAvocadoArray,
			})
		})
		auth.onAuthStateChanged((user) => {
	    if (user) {
	      this.setState({ user });
	    } 
	  });
	}
	login() {
	  auth.signInWithPopup(provider) 
    .then((result) => {
      const user = result.user;
      const userID = result.user.uid;
      this.setState({
        user: user,
        userID: userID,
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
	handleInput(event){
		this.setState({
			[event.target.name]: event.target.value,
		});
	}
	removeAvocado(key) {
		const itemRef = firebase.database().ref(`/avocados/${key}`)
		itemRef.remove();
	}
	handleAdd(event){
		event.preventDefault();
		let currentTime = new Date();
		currentTime = currentTime.getTime();
		const timeToRipe = (this.state.daysToRipe * 24 * 60 * 60 * 1000);
		const finalTime = currentTime + timeToRipe;
		const ripeDate = moment(finalTime);
		ripeDate.minutes(0);
		ripeDate.hours(this.state.timeOfDay);
		const newAvocado = {
			name: this.state.avocadoName,
			email: this.state.avocadoEmail,
			addTime: currentTime,
			daysToRipe: this.state.daysToRipe,
			ripeDate: ripeDate.valueOf(),
			timeOfDay: this.state.timeOfDay,
		}
		dbRef.push(newAvocado);
		this.setState({
			daysToRipe: 1,
			timeOfDay: '',
			avocadoName: '',
			avocadoEmail: '',
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
				/>
				<DisplayAvocado
					avocados={this.state.avocados}
					removeAvocado={this.removeAvocado}
					user={this.state.user}
				/>
			</div>
		)
	}
}

ReactDOM.render(<App />, document.getElementById('app'));