import React from 'react';

class Footer extends React.Component {
	constructor(){
		super();
	}
	render(){
		return(
			<footer>
				<div className="wrapper">
					<div className="footer__text">
						<p><i className="fa fa-copyright"></i> 2017 <a href="http://juneepstein.com">June Epstein</a> | powered by Firebase</p>
						<div>
							<p>Icons made by <a href="http://www.freepik.com" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a> is licensed by <a href="http://creativecommons.org/licenses/by/3.0/" title="Creative Commons BY 3.0" target="_blank">CC 3.0 BY</a></p>
						</div>
					</div>
				</div>
			</footer>
		);
	}
}

export default Footer;