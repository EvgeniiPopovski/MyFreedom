import { fireAuth } from "../firebaseAPI/firebase";

const LOGIN_USER = "LOGIN_USER";
const REGISTER_USER = "REGISTER_USER";

const userReduser = (state = null, action) => {
	switch (action.type) {
		case LOGIN_USER: {
			return action.payload.user;
		}
		case REGISTER_USER: {
			return action.payload.user;
		}
		default:
			return state;
	}
};

const registerUserAC = (user) => {
	return {
		type: REGISTER_USER,
		payload: {
			user: user.user,
		},
	};
};

const loginUserAC = (user) => {
    return {
        type: LOGIN_USER,
        payload : {
            user: user.user
        }
    }
}

const registerThunk = (email, password) => {
	return async (dispatch, getState) => {
		let response = await fireAuth.register(email, password);
		dispatch(registerUserAC(response));
	};
};

const loginThunk = (email , password) => {
    return async (dispatch , getState) => {
        let response = await fireAuth.login(email , password)
        dispatch(loginUserAC(response))
    }
}

export { userReduser, registerThunk , loginThunk };
