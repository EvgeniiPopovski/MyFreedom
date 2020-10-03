import { auth } from "./../firebaseAPI/firebase";
import { fireAuth } from "../firebaseAPI/firebase";

const SET_USER = "SET_USER";
const LOGOUT_USER = "LOGOUT_USER";
const LOADING_USER = 'LOADING_USER'

const userReduser = (state = {user : null , isLoading: false}, action) => {
	switch (action.type) {
		case SET_USER: {
			return {...state , user: action.payload.user};
		}
		case LOGOUT_USER: {
			return {...state , user: action.payload.user};
		}
		case LOADING_USER: {
			return {...state, isLoading: action.payload.isLoading}
		}
		default:
			return state;
	}
};

const setUserAC = (user) => {
	return {
		type: SET_USER,
		payload: {
			user,
		},
	};
};

const logoutUserAC = () => {
	return {
		type: LOGOUT_USER,
		payload: {
			user: null,
		},
	};
};

const loadingUserAC = (bool) => {
	return { 
		type: LOADING_USER,
		payload: { 
			isLoading: bool
		}
	}
}
/*
!THUNK
*/

const registerThunk = (email, password) => {
	return async (dispatch, getState) => {
		dispatch(loadingUserAC(true))
		let response = await fireAuth.register(email, password);
		dispatch(setUserAC(response));
		dispatch(loadingUserAC(false))
	};
};

const loginThunk = (email, password) => {
	return async (dispatch, getState) => {
		dispatch(loadingUserAC(true))
		let response = await fireAuth.login(email, password);
		dispatch(setUserAC(response));
		dispatch(loadingUserAC(false))
	};
};

const logoutThunk = () => {
	return async (dispatch, getState) => {
		dispatch(logoutUserAC());
		await fireAuth.logout();
	};
};

const loadUserThunk = () => {
	return async (dispatch, getState) => {
		await auth.onAuthStateChanged((user) => {
			dispatch(setUserAC(user));
		});
	};
};

const signInWithGoogleThunk = () => {
	return async (dispatch, getState) => {
		dispatch(loadingUserAC(true))
		const user = await fireAuth.signInWithGoogle();
		dispatch(setUserAC(user));
		dispatch(loadingUserAC(false))
	};
};
export {
	userReduser,
	registerThunk,
	loginThunk,
	logoutThunk,
	loadUserThunk,
	signInWithGoogleThunk,
};
