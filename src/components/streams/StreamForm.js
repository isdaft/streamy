import React from 'react';
import {Field, reduxForm} from 'redux-form';


class StreamForm extends React.Component {
	renderError({error, touched}){

		if(touched && error){
			return(
				<div className="ui error message">
					<div className="header">
						{error}
					</div>
				</div>
			)
		}

	}

	//helper method
	//make arrow function to fix undefined renderError error
	renderInput = ({ input, label, meta }) => { //destructure formProps to use just input from formProps.input
		const className = `field ${meta.error && meta.touched ? 'error': ''}`
		
		return (
			<div className={className}>
				<label>{label}</label>
				<input {...input} autoComplete="off"/>
				{this.renderError(meta)}
			</div>
		);
	}
	//helper method
	onSubmit = (formValues) => { //onSubmit sends to redux-form handleSubmit the values of the fields
		this.props.onSubmit(formValues);
	
	}
	render() {
		//console.log(this.props);
		return(
			<form onSubmit={this.props.handleSubmit(this.onSubmit)} className="ui form error">
				<Field name="title" component={this.renderInput} label="Enter Title"/> 
				<Field name="description" component={this.renderInput} label="Enter Description"/> 
				<button className="ui button primary">Submit</button>
			</form>
		);
	}
}

const validate = (formValues) =>{
	const errors = {};
	if(!formValues.title){
		//only ran if user does not enter title
		errors.title = "You must enter a title";
	}
	if(!formValues.description){
	//only ran if user does not enter title
	errors.description = "You must enter a description";
	}
	return errors;
}

export default reduxForm({
	form: 'streamForm',
	validate: validate

})(StreamForm);
