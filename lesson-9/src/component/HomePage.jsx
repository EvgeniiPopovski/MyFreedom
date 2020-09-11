import React from "react";
import { NavLink, Route } from "react-router-dom";
import { NavBar } from "./common/NavBar";
import { useUserContext } from "./context/UserContext";
import { LoginForm } from "./LoginForm/LoginForm";
import { RegistrationForm } from "./RegistrationForm/RegistrationForm";

const HomePage = () => {
	const { user } = useUserContext();
	return (
		<>
			<h1>
				{user?.displayName
					? `Welcome ${user.displayName} to yours personal AwesomeAccountant`
					: `Welcome AwesomeAccountant`}
			</h1>
			<nav>
				<NavBar>
					<NavLink className="navBar__item navBar__link" to="/categories">
						to Categories
					</NavLink>

					<NavLink className="navBar__item navBar__link" to="/expences">
						to Expences
					</NavLink>

					<NavLink exact className="navBar__item navBar__link" to="/">
						Home
					</NavLink>
				</NavBar>
			</nav>
			<div>
				<NavBar>
					<NavLink className="navBar__item navBar__link" to="/login">
						Login
					</NavLink>

					<NavLink className="navBar__item navBar__link" to="/registration">
						RegistrationForm
					</NavLink>
				</NavBar>
			</div>
			<div>
				<Route path="/login">
					<LoginForm />
				</Route>

				<Route path="/registration">
					<RegistrationForm />
				</Route>
			</div>
		</>
	);
};

export { HomePage };
