import React from 'react';
import { connect } from 'react-redux';
import _ from 'lodash';
import { fetchStream, editStream } from '../../actions';
import StreamForm from './StreamForm';


class StreamEdit extends React.Component {
	


	componentDidMount(){
		
		this.props.fetchStream(this.props.match.params.id);
		
		
		//console.log('componentdidmount streamedit props: ', this.props);
	}

	onSubmit = (formValues) => {
		this.props.editStream(this.props.match.params.id, formValues);
	}

	render(){
		
		if(!this.props.stream){
			return <div>Loading...</div>;
		}

		return(
			<div>
				<h3>Edit Stream</h3>
				<StreamForm 
					initialValues={_.pick(this.props.stream.item, 'title', 'description')}
					onSubmit={this.onSubmit}
				/>
			</div>
		);
	

	}
	
}

const mapStateToProps = (state, ownProps) =>{ //own props is the props shwn in stream edit

	return {
		stream: state.streams[ownProps.match.params.id]
	}
}
export default connect(mapStateToProps, {fetchStream, editStream})(StreamEdit);