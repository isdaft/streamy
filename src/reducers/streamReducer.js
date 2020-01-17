import _ from 'lodash';
import {
	CREATE_STREAM,
	FETCH_STREAMS,
	FETCH_STREAM,
	DELETE_STREAM,
	EDIT_STREAM	
} from '../actions/types';

export default (state={}, action) => {
	switch(action.type){
		case FETCH_STREAM:
			return { ...state, [action.payload.id]: action.payload };
		case CREATE_STREAM:
			return { ...state, [action.payload.id]: action.payload };
		case EDIT_STREAM:
			return { ...state, [action.payload.id]: action.payload };
		case FETCH_STREAMS:
		//lodash take an array and return an object
		// create an object out of action.payload and name each obj key by the id
		//... before _.mapKey = adding the large object generated to the new ...state
			return { ...state, ..._.mapKeys(action.payload, 'id')};
		case DELETE_STREAM: {
			return _.omit(state, action.payload);
		}

		default:
			return state;
	}
}