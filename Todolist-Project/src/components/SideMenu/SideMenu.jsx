import React, { useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import { Preloader } from "./../common/Preloader/Preloader";
import "./SideMenu.scss";

const SideMenu = ({ projects, getProjects, getTasks, isLoading, showMenu }) => {
	useEffect(() => {
		getProjects();
		getTasks();
	}, [getProjects, getTasks]);

	return (
		<>
			<nav className={showMenu ? "navigation" : "navigation hidden"}>
				<div>
					<ul className='projectsList'>
						<li className='projectsList__item inbox'>
							<NavLink className='nav-link' to="/Inbox"> Inbox</NavLink>
						</li>
						<li className='projectsList__item focus'>
							<NavLink className='nav-link' to="/Focused">Focus</NavLink>
						</li>
					</ul>
					<h2>Projects</h2>
					{isLoading && <Preloader />}
					<ul>
						{projects.map((item) => (
							<li key={item.id}>
								<Link to={`/project/${item.id}`}>{item.name}</Link>{" "}
								<Link to={`/project/edit/${item.id}`}> edit </Link>
							</li>
						))}
					</ul>
					<Link to="/project/add">Add project</Link>
				</div>
			</nav>
		</>
	);
};

export { SideMenu };
