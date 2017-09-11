import React from 'react';

class Footer extends React.Component {
	constructor(){
		super();
	}
	render(){
		return(
			<footer>
				<div className="wrapper">
					<p><i className="fa fa-copyright"></i> 2017 June Epstein | powered by Firebase</p>
				</div>
			</footer>
		);
	}
}

export default Footer;