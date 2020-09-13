import React from "react";
import { NavLink, Route } from "react-router-dom";
import { NavBar } from "./common/NavBar";
import { useUserContext } from "./context/UserContext";
import { LoginForm } from "./LoginForm/LoginForm";
import { RegistrationForm } from "./LoginForm/RegistrationForm";
import { Header } from "./common/Header/Header";
import "./LoginForm/RegistrationForm.css";

const HomePage = () => {
	const { user, logout } = useUserContext();
	return (
		<>
			<Header user={user} logout={logout} pageName="Home" />
			<div className="container section">
				<div className="loginform">
					<div className="loginform__navbar">
						<NavBar>
							<NavLink className="navBar__item navBar__link" to="/login">
								Login
							</NavLink>
							<NavLink className="navBar__item navBar__link" to="/registration">
								Registration
							</NavLink>
						</NavBar>
					</div>
					<Route path="/login">
						{user ? (
							<p>
								You already logged in. You can <button onClick={logout}>Logout</button>{" "}
							</p>
						) : (
							<LoginForm />
						)}
					</Route>
					<Route path="/registration">
						{user ? <p>You alredy registered</p> : <RegistrationForm />}
					</Route>
				</div>
			</div>
			<h4 className="form__title">Here is some initial text. That could be in home screen </h4>
		</>
	);
};

export { HomePage };
