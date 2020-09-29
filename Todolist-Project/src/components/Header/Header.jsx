import React from "react";
import { Link } from "react-router-dom";

const Header = () => {
	return (
		<header className="header">
			<h1 className="header__title"> The best todolist ever (no) </h1>
            <Link to='/login'>Login</Link>
            <Link to='/registration'>Register</Link>
		</header>
	);
};

export {Header}