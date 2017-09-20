import React from 'react';
import classNames from 'classnames';

class AddAvocado extends React.Component {
	render(){
		const user = this.props.user;
		const classesMorn = classNames({
			"avocadoForm__radio--morn":true,
			"avocadoForm__radio--active": this.props.tod === '9',
		})
		const classesAft = classNames({
			"avocadoForm__radio--aft":true,
			"avocadoForm__radio--active": this.props.tod === '12',
			})
		const classesEve = classNames({
			"avocadoForm__radio--eve":true,
			"avocadoForm__radio--active": this.props.tod === '18',
		})
		let form = '';
		if (user) {
			form = (
				<div className="wrapper">
					<form className="avocadoForm" onSubmit={this.props.handleAdd}>
						<h3>Start an avocado timer</h3>
						<div className="avocadoForm__name">
							<label htmlFor="avocadoName" className="screenReader">Give Your Avocado a Name</label>
							<input type="text" id="avocadoName" name="avocadoName" placeholder="Give your avocado a name so you can remember it later" required value={this.props.avocadoName} onChange={this.props.handleInput} />
						</div>
						<h4>Match the colour of your avocado</h4>
						<div className="avocadoForm__date">
							<div className="avocadoForm__range">
								<div className="rangeBar"></div>
								<input type="range" min='1' max='14' step='1' value={this.props.daysToRipe} name="daysToRipe" onChange={this.props.handleInput} />
							</div>
							<div className="avocadoForm__number">
								
								<input type="number" id="daysToRipe" name="daysToRipe" value={this.props.daysToRipe} min="1" max="14" onChange={this.props.handleInput}/>
								<label htmlFor="daysToRipe">Ripe in # of days</label>
							</div>
						</div>
						<div className="avocadoForm__radio">
							<label className={classesMorn} htmlFor="morningToD">Morning</label>
							<input type="radio" name="timeOfDay" id="morningToD" value="9" className="addAvocado__radioToD" required checked={this.props.checked === "9"} onChange={(e) => this.props.handleInput(e, true)} />
							<label className={classesAft} htmlFor="afternoonToD">Afternoon</label>
							<input type="radio" name="timeOfDay" id="afternoonToD" value="12" className="addAvocado__radioToD" required checked={this.props.checked === "12"}  onChange={(e) => this.props.handleInput(e, true)} />
							<label className={classesEve} htmlFor="eveningToD">Evening</label>
							<input type="radio" name="timeOfDay" id="eveningToD" value="18" className="addAvocado__radioToD" required checked={this.props.checked === "18"} onChange={(e) => this.props.handleInput(e, true)} />
						</div>
						<div className="avocadoForm__button">
							<button>Add Avocado</button>
						</div>
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
						<li>We'll email you to let you know your avocado is ready 📧</li>
						<li>Enjoy your avocado when it is perfectly ripe! 🍴<img src="../../../assets/avocadoSmall.svg" />😋</li>
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