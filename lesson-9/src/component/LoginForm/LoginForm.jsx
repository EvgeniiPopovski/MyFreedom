import React, { useState } from "react";
import { Button } from "../common/Button/Button";
import { firebaseAuth } from "./../../firebaseAPI/firebase";

const LoginForm = () => {
	const [email, setEmail] = useState("");
	const [pass, setPass] = useState("");

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
					<Button type='Save' disabled={!email || !pass} >Log in</Button>
				</div>
			</form>
		</>
	);
};

export { LoginForm };
