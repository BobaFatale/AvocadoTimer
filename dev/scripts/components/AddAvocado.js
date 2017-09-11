import React from 'react';

class AddAvocado extends React.Component {
	render(){
		const user = this.props.user;
		let form = '';
		if (user) {
			form = (
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
			)
		}else if (user === null){
			form = (
				<p>You must be logged in to use Avocado Timer</p>
			)
		}
		return(
			<div className="AddAvocado">
				{form}
			</div>
		)
	}
}

export default AddAvocado;