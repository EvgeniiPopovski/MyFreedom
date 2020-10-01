import React, { useEffect } from "react";
import { Link } from "react-router-dom";

const Header = ({ user, logout , loadUser }) => {
	useEffect(() => {
		loadUser()
	})
	return (
		<header className="header">
			<h1 className="header__title"> The best todolist ever (no) </h1>

			{user ? (
				<>
					<b>Hello {user.displayName || user.email}</b>
					<button onClick={logout}>logout</button>
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
