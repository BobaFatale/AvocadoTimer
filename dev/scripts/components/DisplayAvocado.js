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
			display = (<ul> {this.props.avocados.map((avocado) => {
	    	return (
    			<AvocadoCard key={`${avocado.id}`} avocado={avocado} removeAvocado={this.props.removeAvocado} user={user} />
    		);
    	})} </ul>)
		}else if(user === null){
			// display = ()
		}
		return(
			<section className='avocadoList'>
			  <div className='wrapper'>
		    	{display}
			  </div>
			</section>
		)
	}
}

export default DisplayAvocado;