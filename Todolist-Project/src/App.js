import React from "react";
import "./App.css";
import { ConnectedSideMenu } from "./components/SideMenu/ConnectedSideMenu";




function App() {
	return (
		<div className="grid_container nav_wide">
			<header className="header"><h1 className="header__title"> the best todolist ever </h1></header>
			<nav className="nav">
				<ConnectedSideMenu />
			</nav>
			<main className="main"></main>
		</div>
	);
}

export default App;
