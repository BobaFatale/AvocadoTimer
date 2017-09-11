import React from 'react';
import moment from 'moment';

class DisplayAvocado extends React.Component {
	render(){
		const user = this.props.user;
		let display = '';
		if (user){
			display = (this.props.avocados.map((avocado) => {
			    		const now = new Date();
			    		const currentTime = now.getTime();
			    		const timeLeft = (avocado.ripeDate - currentTime);
			    		let minutesLeft = Math.floor((timeLeft/1000/60) % 60);
			    		let hoursLeft = Math.floor((timeLeft/(1000*60*60)) % 24);
			    		let daysLeft = Math.floor(timeLeft/(1000*60*60*24));
			    		const ripeDate = moment(avocado.ripeDate);
			    		return (
			    			<li className="avocadoList__avocado" key={`${avocado.id}`}>
			    				<h3>{avocado.name}</h3>
			    				<p>Ripe on {ripeDate.format("dddd, MMMM Do YYYY, h:mm a")} </p>
			    				<p>{daysLeft} days, {hoursLeft} hours, {minutesLeft} minutes remaining</p>
			    				<button onClick={() => this.props.removeAvocado(avocado.id)}>Remove Avocado</button>
			    			</li>
			    		);
			    	}))
		}else if(user === null){
			// display = ()
		}
		return(
			<section className='avocadoList'>
			  <div className='wrapper'>
			    <ul>
			    	{display}
			    </ul>
			  </div>
			</section>
		)
	}
}

export default DisplayAvocado;