import React from 'react';
import AvocadoCard from "./AvocadoCard.js";

class DisplayAvocado extends React.Component {
	constructor(){
		super();
	}
	render(){
		const user = this.props.user;
		let display = '';
		if (user){
			display = (<div className="avocadoList__showList">
				<h3>Your Avocados</h3>
				<ul> {this.props.avocados.map((avocado) => {
	    	return (
    			<AvocadoCard key={avocado.id} cardId={avocado.id} avocado={avocado} removeAvocado={this.props.removeAvocado} user={user} />
    		);
    	})} </ul></div>)
		}else if(user === null){
			// display = ()
		}
		return(
			<section className='avocadoList'>
				
	    	{display}
			</section>
		)
	}
}

export default DisplayAvocado;