import React from 'react';

class AddAvocado extends React.Component {
	render(){
		const user = this.props.user;
		let form = '';
		if (user) {
			form = (
				<div className="wrapper">
					<form onSubmit={this.props.handleAdd}>
						<label htmlFor="avocadoName">Give Your Avocado a Name</label>
						<input type="text" id="avocadoName" name="avocadoName" placeholder="Give your avocado a name" value={this.props.avocadoName} onChange={this.props.handleInput} />
						<div className="addAvocado__range">
							<input type="range" min='1' max='14' step='1' value={this.props.daysToRipe} name="daysToRipe" onChange={this.props.handleInput} />
						</div>
						<label htmlFor="daysToRipe">Ripe in # of days:</label>
						<input type="number" id="daysToRipe" name="daysToRipe" value={this.props.daysToRipe} min="1" max="14" onChange={this.props.handleInput}/>
						<div>
							<label htmlFor="morningToD">Morning</label>
							<input type="radio" name="timeOfDay" id="morningToD" value="9" className="addAvocado__radioToD" required checked={this.props.checked === "9"} onChange={(e) => this.props.handleInput(e, true)} />
							<label htmlFor="afternoonToD">Afternoon</label>
							<input type="radio" name="timeOfDay" id="afternoonToD" value="12" className="addAvocado__radioToD" required checked={this.props.checked === "12"}  onChange={(e) => this.props.handleInput(e, true)} />
							<label htmlFor="eveningToD">Evening</label>
							<input type="radio" name="timeOfDay" id="eveningToD" value="18" className="addAvocado__radioToD" required checked={this.props.checked === "18"} onChange={(e) => this.props.handleInput(e, true)} />
						</div>
						<button>Add Avocado</button>
					</form>
				</div>
			)
		}else if (user === null){
			form = (
				<div className="addAvocado__splash">
					<div className="addAvocado__splashTitle">
						<h3>Welcome to <span>Avocado Timer</span></h3>
						<h4>the website designed to save <em>your</em> avocados</h4>
					</div>
					<h5>How to use <span>Avocado Timer</span></h5>
					<ol>
						<li>Sign in with your Google account</li>
						<li>Add your avocado and its ripeness level</li>
						<li>We'll email you to let you know your avocado is ready</li>
						<li>Enjoy your avocado when it is perfectly ripe! 🍴🥑😋</li>
						<li>Tell all your friends</li>
					</ol>
				</div>
			)
		}
		return(
			<section className="form">	
				<div className="AddAvocado">
					{form}
				</div>
			</section>
		)
	}
}

export default AddAvocado;