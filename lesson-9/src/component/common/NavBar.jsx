import React from "react";
import { NavLink } from "react-router-dom";
import "./NavBar.css"

const NavBar = () => {
	return (
		<ul className='navBar'>
			<li className="navBar__item" >
				<NavLink className='navBar__link' to="/categories">to Categories</NavLink>
			</li>
			<li className="navBar__item">
				<NavLink className='navBar__link' to="/expences">to Expences</NavLink>
			</li>
			<li className="navBar__item">
				<NavLink exact className='navBar__link' to="/">Home</NavLink>
			</li>
		</ul>
	);
};

export {NavBar}