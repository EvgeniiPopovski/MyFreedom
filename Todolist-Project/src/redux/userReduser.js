import { auth } from "./../firebaseAPI/firebase";
import { fireAuth } from "../firebaseAPI/firebase";
import { onLogoutTasksAC } from "./tasksReduser";
import { onLogoutProjectstAC } from "./projectsReduser";


const SET_USER = "SET_USER";
const LOGOUT_USER = "LOGOUT_USER";
const LOADING_USER = 'LOADING_USER'
const USER_ERROR_LOGIN = 'USER_ERROR_LOGIN'
const USER_ERROR_REGISTER = 'USER_ERROR_REGISTER'

const InitialState = { user: null, isLoading: false, userError: {loginError : null , registerError: null}}

const userReduser = (state = InitialState , action) => {
	switch (action.type) {
		case SET_USER: {
			return { ...state, user: action.payload.user };
		}
		case LOGOUT_USER: {
			return InitialState;
		}
		case LOADING_USER: {
			return { ...state, isLoading: action.payload.isLoading }
		}
		case USER_ERROR_LOGIN:
			return { ...state, userError: {...state.userError , loginError:  action.payload.errorMessage }}
		case USER_ERROR_REGISTER:
			return { ...state, userError: {...state.userError , registerError:  action.payload.errorMessage }}
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
const userErrorLoginAC = (errorMessage) => {
	return {
		type: USER_ERROR_LOGIN,
		payload: {
			errorMessage
		}
	}
}
const userErrorRegisterAC = (errorMessage) => {
	return {
		type: USER_ERROR_REGISTER,
		payload: {
			errorMessage
		}
	}
}



/*
!THUNK
*/

const registerThunk = (email, password) => {
	return async (dispatch, getState) => {
		try {
			dispatch(loadingUserAC(true))
			let response = await fireAuth.register(email, password);
			dispatch(setUserAC(response));
		} catch (error) {
			dispatch(userErrorRegisterAC(`Error oquired: ${error.message}`))
		} finally {
			dispatch(loadingUserAC(false))
		}

	}

};

const loginThunk = (email, password) => {
	return async (dispatch, getState) => {
		try {
			dispatch(loadingUserAC(true))
			let response = await fireAuth.login(email, password);
			dispatch(setUserAC(response));
		} catch (e) {
			dispatch(userErrorLoginAC(`Error oquired: ${e.message}`))
		}
		finally {
			dispatch(loadingUserAC(false))
		}

	};
};

const logoutThunk = () => {
	return async (dispatch, getState) => {
		try {
			dispatch(logoutUserAC())
			dispatch(onLogoutTasksAC());
			dispatch(onLogoutProjectstAC())
			await fireAuth.logout();
		} catch (e) {
			dispatch(userErrorLoginAC(`Error oquired: ${e.message}`))
		}

	};
};

const loadUserThunk = () => {
	return async (dispatch, getState) => {
		try {
			await auth.onAuthStateChanged((user) => dispatch(setUserAC(user)))
		} catch (e) {
			dispatch(userErrorLoginAC(`Error oquired: ${e.message}`))
		}

	}
}

const signInWithGoogleThunk = () => {
	return async (dispatch, getState) => {
		try {
			dispatch(loadingUserAC(true))
			const user = await fireAuth.signInWithGoogle();
			dispatch(setUserAC(user));
		} catch (e) {
			dispatch(userErrorLoginAC(`Error oquired: ${e.message}`))
		} finally {
			dispatch(loadingUserAC(false))
		}
	};
};
export {
	userReduser,
	registerThunk,
	loginThunk,
	logoutThunk,
	loadUserThunk,
	signInWithGoogleThunk,
	userErrorLoginAC,
	userErrorRegisterAC,
};
