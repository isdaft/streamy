import {SIGN_IN,SIGN_OUT} from '../actions/types';

const INITIAL_STATE = {
	isSignedIn: null,
	googleUser: null,
	userName: null,
	userImage: null
};

export default (state = INITIAL_STATE, action) => {
	switch(action.type){
		case SIGN_IN:
			
			return {...state, isSignedIn: true, googleUser: action.payload.googleUser, userName: action.payload.googleName, userImage: action.payload.googleImage};
		case SIGN_OUT:
			return {...state, isSignedIn: false, googleUser: null };
		default:
			return state;
	}

}