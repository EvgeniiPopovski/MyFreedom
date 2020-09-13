import React from "react";
import { NavBar } from "../NavBar";
import { NavLink } from "react-router-dom";
import './Header.css'
import { Button } from "../Button/Button";

const Header = ({ user, logout, pageName }) => {
	return (
		<>
			<header className='header'>
				<h1 className='header__title'>{pageName}</h1>
				{user ? (
					<label className='header__label'>
						You entered, as <b>{user?.displayName || user.email}</b> <Button onClick={logout}>Logout</Button>
						{/* <Button type='Edit' onClick={() => logout()}> Logout </Button> */}
					</label>
				) : null}
			</header>

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
		</>
	);
};

export { Header };
