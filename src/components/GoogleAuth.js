import React from 'react';
import { connect } from 'react-redux';
import { signIn, signOut } from '../actions';
import { Link } from 'react-router-dom';


class GoogleAuth extends React.Component {

	componentDidMount(){
		
		window.gapi.load('client:auth2', () => {
			
			window.gapi.client.init({
				clientId: process.env.REACT_APP_TEST,
				scope: 'profile email'
			}).then(() => {
				//assign auth instance from gapi to this.auth
				this.auth = window.gapi.auth2.getAuthInstance();
				
				// immeditately update auth state inside of redux store
				this.onAuthChange(this.auth.isSignedIn.get());
				//sit and wait if status changes in the future
				this.auth.isSignedIn.listen(this.onAuthChange); //passing callback onAuthChange to listener method
			
			});
		});

		
	}
	
	onAuthChange = (isSignedIn) => {
		//this.setState({ isSignedIn: this.auth.isSignedIn.get() })
		//pass in google user id into prop
		  


		const googleUser = this.auth.currentUser.get();
		const googleName = googleUser.getBasicProfile().getName();
		const googleImage = googleUser.getBasicProfile().getImageUrl();
		
		//this.setState({ googleUser: googleUser, googleName: googleName, googleImage: googleImage});

		if(isSignedIn){
			this.props.signIn(googleUser.getId(), googleName, googleImage);
		} else {
			this.props.signOut();
		}
	}

	onSignInClick = () => {

		this.auth.signIn();
	}

	onSignOutClick = () => {
		this.auth.signOut();
	}

	renderAuthButton(){
		if(this.props.isSignedIn === null){
			return null;
		} else if(this.props.isSignedIn){

			return(
				<button onClick={ this.onSignOutClick } className="ui red google button">
					<i className="google icon"/>
					Sign Out
				</button>
			);
		} else {
			return(
				<button onClick={ this.onSignInClick } className="ui blue google button">
					<i className="google icon"/>
					Sign In
				</button>
			);
		}
		
	}

	renderStreamer(){
		if(this.props.isSignedIn === null){
			return null;
		} else if(this.props.isSignedIn){
			return(
				<Link to="/" className="item">
					<img className="ui avatar image" src={this.props.userImage}/>
					<span>{this.props.userName}</span>
				</Link>

			);
		}
	}

	render(){
		
		
		return (
			<React.Fragment>
				{this.renderStreamer()}
				<div className="right menu">
					<Link to="/" className="item">
						All Streams
					</Link>
					<div className="item">
					{this.renderAuthButton()}
					</div>
					
					
				</div>
				

			</React.Fragment>

		);
	};
}

const mapStateToProps = (state) => {
	return { 
		isSignedIn: state.auth.isSignedIn,
		googleUser: state.auth.googleUser,
		userName: state.auth.userName,
		userImage: state.auth.userImage
	};
}

export default connect(mapStateToProps, { signIn, signOut })(GoogleAuth);