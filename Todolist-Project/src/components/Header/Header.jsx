import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { UserPreview } from "../UserPreview/UserPreview";
import './Header.scss'



const Header = ({ user, logout , loadUser }) => {
	useEffect(() => {
		loadUser()
	})
	return (
		<header className="header">
			<h1 className="header__title"> The best todolist ever (no) </h1>

			{user ? (
				<>
					<UserPreview user={user} logout={logout} />
				</>
			) : (
				<>
					<Link to="/login">Login</Link>
					<Link to="/registration">Register</Link>
					<Link to="/welcomePage">Welcome Page</Link>
				</>
			)}
		</header>
	);
};

export { Header };
