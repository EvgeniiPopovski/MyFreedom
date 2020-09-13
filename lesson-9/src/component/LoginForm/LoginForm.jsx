import React, {  useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { Button } from "../common/Button/Button";
import { useUserContext } from "../context/UserContext";

const LoginForm = () => {
	const { login, error } = useUserContext();

	const [email, setEmail] = useState("");
	const [pass, setPass] = useState("");
	const [errorLogin, setErrorLogin] = useState('');

	const location = useLocation();
	const history = useHistory();

	

	return (
		<>
			<form className="input__container" onSubmit={(e) => e.preventDefault(e)}>
				<h3 className="form__title">Login</h3>
				<input
					className="login-form__input"
					value={email}
					onClick={() => setErrorLogin("")}
					onChange={(e) => setEmail(e.target.value)}
					type="text"
					name="email"
					placeholder="Enter your E-mail"
				/>

				<input
					className="login-form__input"
					value={pass}
					onClick={() => setErrorLogin("")}
					onChange={(e) => setPass(e.target.value)}
					type="password"
					name="password"
					placeholder="Enter your password"
				/>

				{errorLogin && <div className="error">{errorLogin}</div>}

				<Button
					type="Save"
					disabled={!email || !pass}
					onClick={async () => {
						try{
							await login(email, pass);
							if (!error && location.state?.ref) {
								history.replace(location.state.ref);
							}
						} catch (e) {
							setErrorLogin(`Error: ${e.message}`)
						}
						
					}}
				>
					Log in
				</Button>
			</form>
		</>
	);
};

export { LoginForm };
