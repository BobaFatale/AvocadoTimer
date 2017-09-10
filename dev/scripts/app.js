import React from 'react';
import ReactDOM from 'react-dom';

import firebase from './components/firebase.js';
import Header from  './components/Header.js';
import AddAvocado from './components/AddAvocado.js';

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
		}
		this.handleInput = this.handleInput.bind(this);
		this.handleAdd = this.handleAdd.bind(this);
	}
	handleInput(event){
		this.setState({
			[event.target.name]: event.target.value,
		});
	}
	handleAdd(event){
		event.preventDefault();
		let currentTime = new Date();
		currentTime = currentTime.getTime();
		const timeToRipe = (this.state.daysToRipe * 24 * 60 * 60 * 1000);
		const ripeDate = currentTime + timeToRipe;
		const newAvocado = {
			name: this.state.avocadoName,
			email: this.state.avocadoEmail,
			addTime: currentTime,
			daysToRipe: this.state.daysToRipe,
			ripeDate: ripeDate,
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
	componentDidMount(){
		console.log('Engaged');
	}
	render(){
		
		return (
			<div>
				<Header />
				<AddAvocado 
					handleInput={this.handleInput}
					handleAdd={this.handleAdd}
					daysToRipe={this.state.daysToRipe}
					avocadoName={this.state.avocadoName}
					avocadoEmail={this.state.avocadoEmail}
				/>
			</div>
		)
	}
}

ReactDOM.render(<App />, document.getElementById('app'));