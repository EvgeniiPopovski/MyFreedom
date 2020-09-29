import React, { useState } from "react";
import { useHistory } from "react-router-dom";

const RegistrationForm = ({ register }) => {

    const history = useHistory()

	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [passwordConfirmation, setPasswordConfirmation] = useState("");
	return (
		<div>
			<form onSubmit={(e) => e.preventDefault()}>
				<h1>Register</h1>
				<div>
					<label htmlFor="login">Login by email</label>
					<input
						name="login"
						type="text"
						placeholder="Enter your email"
						value={email}
						onChange={(e) => setEmail(e.target.value)}
					/>
				</div>
				<div>
					<label htmlFor="password">Password</label>
					<input
						name="password"
						type="password"
						placeholder="Enter your Password"
						value={password}
						onChange={(e) => setPassword(e.target.value)}
					/>
				</div>
				<div>
					<label htmlFor="passwordConfirmation">Confirm Password</label>
					<input
						name="passwordConfirmation"
						type="password"
						placeholder="Confirm your Password"
						value={passwordConfirmation}
						onChange={(e) => setPasswordConfirmation(e.target.value)}
					/>
				</div>
				<button
					onClick={async () => {
                        if(password === passwordConfirmation) {
                            await register(email, password)
                            history.push('/inbox')
                        }
						
					}}
					disabled={!email || !password || !passwordConfirmation}
				>
					Register
				</button>
			</form>
		</div>
	);
};

export { RegistrationForm };
