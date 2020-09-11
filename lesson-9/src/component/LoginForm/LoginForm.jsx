import React, { useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { Button } from "../common/Button/Button";
import { useUserContext } from "../context/UserContext";

const LoginForm = () => {
	const [email, setEmail] = useState("");
	const [pass, setPass] = useState("");

	const location = useLocation();
	const history = useHistory();

	const { login } = useUserContext();

	return (
		<>
			<form onSubmit={(e) => e.preventDefault(e)}>
				<div>
					<input
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						type="text"
						name="email"
						placeholder="Enter your E-mail"
					/>
				</div>
				<div>
					<input
						value={pass}
						onChange={(e) => setPass(e.target.value)}
						type="password"
						name="password"
						placeholder="Enter your password"
					/>
				</div>
				<div>
					<Button
						type="Save"
						disabled={!email || !pass}
						onClick={async () => {
							await login(email, pass);
							if (location.state?.ref) {
								history.replace(location.state.ref)
							} else {
								history.replace("/home")
							}
						}}
					>
						Log in
					</Button>
				</div>
			</form>
		</>
	);
};

export { LoginForm };
