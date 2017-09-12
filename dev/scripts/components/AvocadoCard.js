import React from 'react';
import moment from 'moment';
import classNames from 'classnames';
import Countdown from "./Countdown.js";


class AvocadoCard extends React.Component {
	constructor(){
		super();
		
	}
	componentDidMount(){
		this.setState({
			expired: false,
		})
	}
	expired(){
		this.setState({
			expired: true,
		})
	}
	render(){
		const now = new Date();
		const currentTime = now.getTime();
		const timeLeft = (this.props.avocado.ripeDate - currentTime);
		let minutesLeft = Math.floor((timeLeft/1000/60) % 60);
		let hoursLeft = Math.floor((timeLeft/(1000*60*60)) % 24);
		let daysLeft = Math.floor(timeLeft/(1000*60*60*24));
		const ripeDate = moment(this.props.avocado.ripeDate);
		
		if (this.state != null){
			const classes = classNames({
				"avocadoList__avocado":true,
				"avocadoList__avocado--expired": this.state.expired === true,
			})
		}else{
			const classes = classNames({
				"avocadoList__avocado":true,
			})
		}
		return(
			<li 
				className="avocadoList__avocado" 
			>
				<h3>{this.props.avocado.name}</h3>
				<p>Ripe on {ripeDate.format("dddd, MMMM Do YYYY, h:mm a")} </p>
				<p>{daysLeft} days, {hoursLeft} hours, {minutesLeft} minutes remaining</p>
				<Countdown ripeDate={this.props.avocado.ripeDate} expired={this.expired}/>
				<button onClick={() => this.props.removeAvocado(this.props.avocado.id,this.props.avocado.emailKey)}>Remove Avocado</button>
			</li>
		);
	}
}

export default AvocadoCard;