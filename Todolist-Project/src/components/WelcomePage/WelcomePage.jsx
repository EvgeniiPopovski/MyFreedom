import React from "react";
import { Link } from "react-router-dom";
import { Button } from "../common/Button/Button";

import "./WelcomPage.scss";

const WelcomePage = () => {
	return (
		<section className="welcome section">
			<h1 className="welcome__title">Welcome to MyAswomeTodolist</h1>
			<Link to="/login">
				<Button kind="submit">Start</Button>
			</Link>
		</section>
	);
};

export { WelcomePage };
