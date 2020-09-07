import React from "react";
import { NavLink } from "react-router-dom";

const HomePage = () => {
	return (
		<>
			<h1>Welcome to yours personal , AwesomeAccountant</h1>
			<nav>
				<ul>
					<li><NavLink to="/categories">to Categories</NavLink></li>
					<li><NavLink to="/expences">to Expences</NavLink></li>
				</ul>
			</nav>
		</>
	);
};

export { HomePage };
