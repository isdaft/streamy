//action creators
import {
	SIGN_IN,
	SIGN_OUT,
	CREATE_STREAM,
	FETCH_STREAMS,
	FETCH_STREAM,
	DELETE_STREAM,
	EDIT_STREAM,
	FETCH_FB_STREAMS
} from './types';
import history from '../history';
import streams from '../apis/streams';

//internal bool tag change sign in to true
export const signIn = (userId, userName, userImage) => {
	return {
		type: SIGN_IN,
		payload: {
			googleUser: userId,
			googleName: userName,
			googleImage: userImage
		} 
	};
};


export const signOut = () => {
	return {
		type: SIGN_OUT
	};
};

export const createStream = formValues => async (dispatch, getState) =>{
	const { googleUser } = getState().auth; //pluck out userId from getState().auth
	const res = await streams.post('api/create/', {...formValues, googleUser}).catch(e => {
		console.log(e.response);
	});
	//console.log(res);
	dispatch({ type: CREATE_STREAM, payload: res })

	//get user back to root
	history.push('/');
}

export const fetchStreams = () => async dispatch =>{
	const res = await streams.get('api/read');
	
	dispatch({ type: FETCH_STREAMS, payload: res.data});
	
}

export const fetchStream = (id) => async dispatch =>{
	const res = await streams.get(`api/read/${id}`);
	
	dispatch({ type: FETCH_STREAM, payload: res.data});
}



export const editStream = (id, formValues) => async dispatch =>{
	const res = await streams.patch(`api/update/${id}`, formValues);
	dispatch({ type: EDIT_STREAM, payload: res.data});
	history.push('/');
}

export const deleteStream = (id) => async dispatch =>{
	await streams.delete(`api/delete/${id}`);

	dispatch({ type: DELETE_STREAM, payload: id});
	history.push('/');
}