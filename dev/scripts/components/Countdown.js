import React from 'react';

class Countdown extends React.Component {
	constructor(){
		super();
		this.state = {
			timeLeft: '',
		}
		this.runCountdown();
		this.runCountdown = this.runCountdown.bind(this);
		this.timerEnds = this.timerEnds.bind(this);
	}
	componentWillUnmount() {
		clearInterval(this.timerID);
	}
	runCountdown(){
		const parseTimeLeft = (ripeDate) => {
			const currentTime = new Date();
			const now = currentTime.getTime();
			const timeLeft = (ripeDate - now);
			let minutesLeft = Math.floor((timeLeft/1000/60) % 60);
			let hoursLeft = Math.floor((timeLeft/(1000*60*60)) % 24);
			let daysLeft = Math.floor(timeLeft/(1000*60*60*24));
			return {
				days: daysLeft,
				hours: hoursLeft,
				minutes: minutesLeft,
			}
		}
		this.timerID = setInterval(() => this.tick(), 1000)
		
		this.tick = () => {
			if(this.state.timeLeft.days <= 0 && this.state.timeLeft.hours <= 0) {
				clearInterval(this.timerID)
				this.timerEnds()
			}
			this.setState({
				timeLeft: parseTimeLeft(this.props.ripeDate)
			})
		}
	}
	timerEnds() {
		// this.props.removeAvocado(this.key);
		this.props.expired();
		this.props.removeAvocado(this.props.parentID);
		this.setState({
			timeLeft: '',
		})
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
					{this.state.timeLeft.days} Days
					</div>
					<div className="timer__hours">
					{this.state.timeLeft.hours} Hours
					</div>
					<div className="timer__minutes">
					{this.state.timeLeft.minutes} Minutes
					</div>
				</div>
			</div>
		)
	}
}

export default Countdown;