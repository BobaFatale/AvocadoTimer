import React from 'react';

const Header = (props) => {
	const user = props.user;
	let auth = '';
	if (user){
		auth = ( <button className="auth__button auth__button--logout" onClick={props.logout}>Log Out</button> )
	}else if(user === null){
		auth = ( <button className="auth__button auth__button--login" onClick={props.login}>Log In</button> )
	}
	return(
		<header>
			<div className="headWrap">
				<div className="header__title">
					<h1>Avocado Timer</h1>
					<h2>by Guacr</h2>
					<img src="../../../assets/avocadoSmall.svg" />
				</div>
				{auth}
			</div>
		</header>
	)
}

export default Header;