import React from 'react';
import { Link } from 'react-router-dom';
import GoogleAuth from './GoogleAuth';



class Header extends React.Component {
	
	render(){
	
		return (
			<div className="ui menu">
				
				
					<GoogleAuth/>
					
				

			</div>
		);


	}

	
}

export default Header; 