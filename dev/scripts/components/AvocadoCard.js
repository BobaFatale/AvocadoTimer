import React from 'react';
import moment from 'moment';
import classNames from 'classnames';
import Countdown from "./Countdown.js";
 

class AvocadoCard extends React.Component {
	constructor(){
		super();
		this.expired = this.expired.bind(this);
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
		const ripeDate = moment(this.props.avocado.ripeDate);
		let classes = '';
		if (this.state != null){
			classes = classNames({
				"avocadoList__avocado":true,
				"avocadoList__avocado--expired": this.state.expired === true,
			})
		}else{
			classes = classNames({
				"avocadoList__avocado":true,
			})
		}

		return(
			<li 
				className={classes}
			>
				<h4>{this.props.avocado.name}</h4>
				<p>Ripe on {ripeDate.format("dddd, MMMM Do YYYY, h:mm a")} </p>
				<Countdown removeAvocado={this.props.removeAvocado} ripeDate={this.props.avocado.ripeDate} expired={this.expired} parentID={this.props.cardId} />
				<button onClick={() => this.props.removeAvocado(this.props.avocado.id,this.props.avocado.emailKey)}>Remove Avocado</button>
			</li>
		);
	}
}

export default AvocadoCard;