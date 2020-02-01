import React from 'react';
import Modal from '../Modal';
import { connect } from 'react-redux';
import { fetchStream, deleteStream } from '../../actions';
import history from '../../history';
import { Link } from 'react-router-dom';
//cdm 
class StreamDelete extends React.Component{
	componentDidMount(){
		this.props.fetchStream(this.props.match.params.id);
	}

	renderActions(){
		//ES15 destructure id out of params

		const { id } = this.props.match.params;
		//onclick arrow function to only run when clicked
		return(
			<React.Fragment>
				<button onClick={() => this.props.deleteStream(id)}className="ui primary button">Delete</button>
				<Link to="/" className="ui button">Cancel</Link>
			</React.Fragment>
		);
	}

	renderContent(){
		if(!this.props.stream){
			return 'Are you sure you want to delete this stream: ?';
		}
		return `Are you sure you want to delete the stream: ${this.props.stream.item.title} ?`;
	}

	render(){
		return (
			<Modal 
			title="Delete Stream" 
			content={this.renderContent()} 
			actions={this.renderActions()} //<!-- () call it
			onDismiss={() => history.push('/')}/>

		);
	}
}

const mapStateToProps = (state,ownProps) => {
	return {stream: state.streams[ownProps.match.params.id]}
}

export default connect(mapStateToProps, {fetchStream,deleteStream})(StreamDelete);