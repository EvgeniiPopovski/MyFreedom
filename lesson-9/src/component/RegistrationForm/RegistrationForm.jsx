import React, { useState } from "react";
import { Button } from "../common/Button/Button";
import { useUserContext } from "../context/UserContext";

/// сделать вывод ошибок, при неправильно введенныз данных

const RegistrationForm = () => {

	const {registration} = useUserContext()
	const {error} = useUserContext()

	const [email, setEmail] = useState("");
	const [pass, setPass] = useState("");
	const [passVerification, setPassVerification] = useState("");

	const [errorRegstr, setErrorRegstr] = useState(error);

	

	if (error){
		return <div>{errorRegstr}</div>
	}

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
						onClick={() => {
							if (pass !== passVerification) {
								setErrorRegstr('Passwords doesn"t match each other ')
							} else {
                                try {
                                    registration(email, pass);
                                } catch (e) {
                                    setErrorRegstr(`Error oquired : ${e.message}`)
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
