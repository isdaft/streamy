import React from 'react';
import { Link } from 'react-router-dom';
import GoogleAuth from './GoogleAuth';
import fauth from '../firebase'

const Header = () => {
	return (
		<div className="ui menu">
			<Link to="/" className="item">
				Streamer
			</Link>
			<div className="right menu">
				<Link to="/" className="item">
					All Streams
				</Link>
				<GoogleAuth/>
			</div>
		</div>
	);
};

export default Header; 