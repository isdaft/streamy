import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { fetchStreams } from '../../actions';

//class based - action creator inside component did mount

class streamList extends React.Component {

	componentDidMount() {
		this.props.fetchStreams();

	}
	renderList(){
		return this.props.streams.map(stream => {
			return (
				<div className="item" key={stream.id}>
				{this.renderAdmin(stream)}
					<i className="large middle aligned icon camera"/>
					<div className="content">
					{stream.title}
					</div>
					<div className="description">
					{stream.description}
					</div>
					

				</div>
			);
		})
	}
	renderAdmin(stream){ //edit and delete personal stream
		if(stream.userId === this.props.currentUserId){
			return(
				<div className="right floated content">
					
					<Link to={`/streams/edit/${stream.id}`} className="ui button primary">Edit</Link>
					
					<Link to={`/streams/delete/${stream.id}`} className="ui button negative">Delete</Link>
				</div>
			)
		}
	}
	renderCreate(stream){ //show create button if logged in
		if(this.props.isSignedIn){
			return(
				<div style={{textAlign: 'right'}} >
					<Link to="/streams/new" className="ui button primary">Create New Stream</Link>
				</div>
			);
		}

	}
	render() {
		console.log(this.props.streams);
		return(
			<div>
				<h2>Streams</h2>
				<div className="ui celled list">
				{this.renderList()}
				</div>
				{this.renderCreate()}
			</div>
		);
	}

}
const mapStateToProps = (state)=> {
	//Object.values() = turn objects into an array
	return { 
		streams: Object.values(state.streams),
		currentUserId: state.auth.userId,
		isSignedIn: state.auth.isSignedIn
	}
}

export default connect(mapStateToProps, { fetchStreams })(streamList);