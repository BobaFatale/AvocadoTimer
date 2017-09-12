import React from 'react';

class Countdown extends React.Component {
	constructor(){
		super();
	}
	runCountdown(){
		const currentTime = new Date();
		const now = currentTime.getTime();
		const timeLeft = (this.props.ripeDate - now);
		let minutesLeft = Math.floor((timeLeft/1000/60) % 60);
		let hoursLeft = Math.floor((timeLeft/(1000*60*60)) % 24);
		let daysLeft = Math.floor(timeLeft/(1000*60*60*24));
		const ripeDate = moment(this.props.ripeDate);
	}
	render(){
		// const classes = className({
		// 	'avocado__countdown':true,
		// 	'avocado__countdown--over': false,
		// })
		return(
			<div className='avocado__countdown'>
				<div className="timer">
					<div className="timer__days">
					</div>
					<div className="timer__hours">
					</div>
					<div className="timer__minutes">
					</div>
				</div>
			</div>
		)
	}
}

export default Countdown;