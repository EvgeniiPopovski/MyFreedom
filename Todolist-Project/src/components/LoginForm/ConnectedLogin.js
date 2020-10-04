import { connect } from "react-redux";
import { getUser, getUserError } from "../../redux/selectors/Selectors";
import { loginThunk, signInWithGoogleThunk } from "../../redux/userReduser";
import { LoginForm } from "./LoginForm";

const mapStateToProps = (state) => {
	return {
		user: getUser(state),
		userError: getUserError(state)
	};
};

const mapDispatchToPrps = (dispatch) => {
	return {
		login: (email, password) => dispatch(loginThunk(email, password)),
		signInWithGoogle: () => dispatch(signInWithGoogleThunk()),
	};
};

const ConnectedLoginForm = connect(mapStateToProps, mapDispatchToPrps)(LoginForm);

export { ConnectedLoginForm };
