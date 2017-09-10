import React from 'react';

class AddAvocado extends React.Component {
	render(){
		return(
			<div>
				<form onSubmit={this.props.handleAdd}>
					<label htmlFor="avocadoName">Give Your Avocado a Name</label>
					<input type="text" id="avocadoName" name="avocadoName" placeholder="Give your avocado a name" value={this.props.avocadoName} onChange={this.props.handleInput} />
					<label htmlFor="emailInput">Enter your email address</label>
					<input type="email" id="emailInput" name="avocadoEmail" placeholder="enter your email" value={this.props.avocadoEmail} onChange={this.props.handleInput} />
					<div className="addAvocado__range">
						<input type="range" min='1' max='14' step='1' value={this.props.daysToRipe} name="daysToRipe" onChange={this.props.handleInput} />
					</div>
					<label htmlFor="daysToRipe">Ripe in # of days:</label>
					<input type="number" id="daysToRipe" name="daysToRipe" value={this.props.daysToRipe} min="1" max="14" onChange={this.props.handleInput}/>
					<div>
						<label htmlFor="morningToD">Morning</label>
						<input type="radio" name="timeOfDay" id="morningToD" value="0900" className="addAvocado__radioToD" onChange={this.props.handleInput} />
						<label htmlFor="afternoonToD">Afternoon</label>
						<input type="radio" name="timeOfDay" id="afternoonToD" value="1200" className="addAvocado__radioToD" onChange={this.props.handleInput} />
						<label htmlFor="eveningToD">Evening</label>
						<input type="radio" name="timeOfDay" id="eveningToD" value="1800" className="addAvocado__radioToD" onChange={this.props.handleInput} />
					</div>
					<button>Add Avocado</button>
				</form>
			</div>
		)
	}
}

export default AddAvocado;