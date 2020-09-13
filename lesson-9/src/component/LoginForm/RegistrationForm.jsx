import React, { useState } from "react";
import { Button } from "../common/Button/Button";
import { useUserContext } from "../context/UserContext";

const RegistrationForm = () => {
	const { registration } = useUserContext();

	const [email, setEmail] = useState("");
	const [pass, setPass] = useState("");
	const [passVerification, setPassVerification] = useState("");

	const [errorRegstr, setErrorRegstr] = useState("");

	return (
		<>
			<form className="input__container" onSubmit={(e) => e.preventDefault(e)}>
				<h3 className="form__title">Registration</h3>

				<input
					className="login-form__input"
					value={email}
					onChange={(e) => {
						setEmail(e.target.value);
					}}
					type="text"
					name="email"
					placeholder="Enter your E-mail"
				/>

				<input
					className="login-form__input"
					value={pass}
					onChange={(e) => setPass(e.target.value)}
					type="password"
					name="password"
					placeholder="Enter your password"
				/>

				<input
					className="login-form__input"
					value={passVerification}
					onChange={(e) => setPassVerification(e.target.value)}
					type="password"
					name="password"
					placeholder="Confirm password"
				/>

				{errorRegstr && <div className="error">{errorRegstr}</div>}

				<Button
					type="Save"
					disabled={!email || !pass || !passVerification}
					onClick={async () => {
						if (pass !== passVerification) {
							setErrorRegstr('Passwords doesn"t match each other ');
						} else {
							try {
								await registration(email, pass);
							} catch (e) {
								setErrorRegstr(`Error : ${e.message}`);
							}
						}
					}}
				>
					Register
				</Button>
			</form>
		</>
	);
};

export { RegistrationForm };
