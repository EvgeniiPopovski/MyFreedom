import React from "react";
import "./NavBar.css";

const NavBar = ({children}) => {
	return (
		<div className="navBar">
			{children}
		</div>
	);
};

export { NavBar };
