import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { FadeComponent } from "../common/FadeComponent/FadeComponent";
import googleIcon from "./../../icons/GoogleIcon.svg";
import "./LoginForm.scss";

const LoginForm = ({ user, login, signInWithGoogle, userError, resetLoginError }) => {
	const history = useHistory();

	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");

	return (
		<FadeComponent inProp={true} timeout={100} className={"container"}>
			<form onSubmit={(e) => e.preventDefault()} className="form login">
				<div className="form-content">
					<h1 className="form__header">Login</h1>
					<p className="form__sub-title">Welcome back! Get in Here! </p>
					{userError.loginError && (
						<div className="form__error">{userError.loginError}</div>
					)}
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
						<br />
						<input
							className="form__input"
							name="password"
							type="password"
							placeholder="Enter your Password"
							value={password}
							onChange={(e) => setPassword(e.target.value)}
						
						/>
					</div>
					<button
						className="form__button"
						disabled={!email || !password}
						onClick={async () => {
							resetLoginError()
							await login(email, password);
							!userError.registerError && user && history.push("/inbox");
						}}
					>
						Login
					</button>
					<div>
						<button
							className="login__sochial"
							onClick={() => {
								signInWithGoogle();
								!userError.Login && user && history.push("/inbox");
							}}
						>
							<img
								className="button-img"
								src={googleIcon}
								alt="google icon"
							/>
							Sign in with Google
						</button>
					</div>
				</div>
			</form>
		</FadeComponent>
	);
};

export { LoginForm };
