import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { UserPreview } from "../UserPreview/UserPreview";
import "./Header.scss";
import menuIcon from "./../../icons/menu-outline.svg";


const Header = ({ user, logout, loadUser, openMenu, showMenu }) => {
	useEffect(() => {
		loadUser();
	});
	return (
		<header className="header">
			{user &&  <button className='sideMenu-toggler' onClick={() => openMenu(!showMenu)}>
				<img className='sideMenu-toggler-img' src={menuIcon} alt="Close Menu" />
			</button>}
			<h1 className="header__title">best todolist</h1>

			{user ? (
				<>
					<UserPreview user={user} logout={logout} />
				</>
			) : (
				<>
					<Link className="link" to="/login">
						Login
					</Link>
					<Link className="link" to="/registration">
						Register
					</Link>
					<Link className="link" to="/welcomePage">
						Welcome Page
					</Link>
				</>
			)}
		</header>
	);
};

export { Header };
