//action creators
import {SIGN_IN,SIGN_OUT} from './types';
//internal bool tag change sign in to true
export const signIn = (userId) => {
	return {
		type: SIGN_IN,
		payload: userId
	};
};


export const signOut = () => {
	return {
		type: SIGN_OUT
	};
};