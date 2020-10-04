import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import "./../LoginForm/LoginForm.scss";

const RegistrationForm = ({ user, register, userError, signInWithGoogle }) => {
	const history = useHistory();

	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [passwordConfirmation, setPasswordConfirmation] = useState("");

	return (
		<div className="container">
			<form onSubmit={(e) => e.preventDefault()} className="form login">
				<div className="form-content">
					<h1 className="form__header">Registration</h1>
					<p className="form__sub-title">Lets get an account</p>

					{userError.registerError && <div>{userError.registerError}</div>}

					<div>
						<label className="label-input" htmlFor="login">
							Login by email
						</label>
						<input
							className="form__input"
							name="login"
							type="text"
							placeholder="Enter your email"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
						/>
					</div>
					<div>
						<label className="label-input" htmlFor="password">
							Password
						</label>
						<input
							className="form__input"
							name="password"
							type="password"
							placeholder="Enter your Password"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
						/>
					</div>
					<div>
						<label className="label-input" htmlFor="passwordConfirmation">
							Confirm Password
						</label>
						<input
							className="form__input"
							name="passwordConfirmation"
							type="password"
							placeholder="Confirm your Password"
							value={passwordConfirmation}
							onChange={(e) => setPasswordConfirmation(e.target.value)}
						/>
					</div>
					<button
						className="form__button"
						onClick={async () => {
							if (password === passwordConfirmation) {
								await register(email, password);
								!userError.registerError && user && history.push("/inbox");
							}
						}}
						disabled={
							!email || !password || !passwordConfirmation || userError.registerError
						}
					>
						Register
					</button>
				</div>
			</form>
		</div>
	);
};

export { RegistrationForm };
