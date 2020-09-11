import React, { useState } from "react";
import { Button } from "../common/Button/Button";
import { firebaseAuth } from "../../firebaseAPI/firebase";

/// сделать вывод ошибок, при неправильно введенныз данных

const RegistrationForm = () => {
	const [email, setEmail] = useState("");
	const [pass, setPass] = useState("");
	const [passVerification, setPassVerification] = useState("");

	const [error, setError] = useState("");

	return (
		<>
			<form onSubmit={(e) => e.preventDefault(e)}>
				<div>
					<input
						value={email}
						onChange={(e) => {
							setEmail(e.target.value);
						}}
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
					<input
						value={passVerification}
						onChange={(e) => setPassVerification(e.target.value)}
						type="password"
						name="password"
						placeholder="Confirm password"
					/>
				</div>
				<div>
					<Button
						type="Save"
						disabled={!email || !pass || !passVerification}
						onClick={async  () => {
							if (pass !== passVerification) {
								setError('passwords doesn"t match each other ')
							} else {
                                try {
                                    let response = await firebaseAuth.createUserWithEmailAndPassword(email, pass);
                                    console.log(response)
                                } catch (e) {
                                    setError(`Error oquired : ${e.message}`)
                                }
                            }
						}}
					>
						Register
					</Button>
				</div>
			</form>
		</>
	);
};

export { RegistrationForm };
