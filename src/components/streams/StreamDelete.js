import React from 'react';
import Modal from '../Modal';
import history from '../../history';
//cdm 
class StreamDelete extends React.Component{
	componentDidMount(props){
		console.log(props)
	}

	renderActions(){

		return(
			<React.Fragment>
				<button className="ui primary button">Delete</button>
				<button className="ui button">Cancel</button>
			</React.Fragment>
		);
	}
	render(){
		return (
			<div>
				<h3>Delete Stream</h3>
				<Modal 
				title="Delete Stream" 
				content="Are you sure you want to delete this stream?" 
				actions={this.renderActions()} //<!-- () call it
				onDismiss={() => history.push('/')}/>
			</div>

		);
	}
}

export default StreamDelete;