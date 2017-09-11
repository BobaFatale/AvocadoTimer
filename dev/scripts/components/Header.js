import React from 'react';

const Header = (props) => {
	const user = props.user;
	let auth = '';
	if (user){
		auth = ( <button onClick={props.logout}>Log Out</button> )
	}else if(user === null){
		auth = ( <button onClick={props.login}>Log In</button> )
	}
	return(
		<header>
			<h1>Avocado Timer</h1>
			{auth}
		</header>
	)
}

export default Header;