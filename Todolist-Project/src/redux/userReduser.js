import { auth } from "./../firebaseAPI/firebase";
import { fireAuth } from "../firebaseAPI/firebase";


const SET_USER = "SET_USER";
const LOGOUT_USER = 'LOGOUT_USER'

const userReduser = (state = null, action) => {
	switch (action.type) {
		case SET_USER: {
			return action.payload.user;
		}
		case LOGOUT_USER: {
			return action.payload.user;
		}
		default:
			return state;
	}
};

const setUserAC = (user) => {
	return {
		type: SET_USER,
		payload: {
			user: user,
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

const registerThunk = (email, password) => {
	return async (dispatch, getState) => {
		let response = await fireAuth.register(email, password);
		dispatch(setUserAC(response));
	};
};

const loginThunk = (email, password) => {
	return async (dispatch, getState) => {
		let response = await fireAuth.login(email, password);
		dispatch(setUserAC(response));
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
export { userReduser, registerThunk, loginThunk, logoutThunk , loadUserThunk };
