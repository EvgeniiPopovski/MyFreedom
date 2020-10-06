import React, { memo, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import { Preloader } from "./../common/Preloader/Preloader";
import editIcon from "./../../icons/edit-outline.svg";
import "./SideMenu.scss";
import { Transition } from "react-transition-group";

const SideMenu = memo(({ projects, getProjects, getTasks, isLoading, showMenu }) => {
	useEffect(() => {
		getProjects();
		getTasks();
	}, [getProjects, getTasks]);

	return (
		<>
			<Transition in={showMenu} timeout={200} appear unmountOnExit>
				{(state) => (
					<nav className={`navigation ${state}`}>
						{/* <nav className={showMenu ? "navigation" : "navigation hidden"}> */}
						<div className="projects-container">
							<ul className="projects list">
								<li className="projectsList__item inbox">
									<NavLink className="nav-link" to="/Inbox">
										Inbox
									</NavLink>
								</li>
								<li className="projectsList__item focus">
									<NavLink className="nav-link" to="/Focused">
										Focus
									</NavLink>
								</li>
							</ul>
							<h2>Projects</h2>
							{isLoading && <Preloader />}
							<ul className="projects list">
								{projects.map((item) => (
									<li
										className="projectsList__item inbox"
										key={item.id}
									>
										<NavLink
											className="nav-link"
											to={`/project/${item.id}`}
										>
											{item.name}
										</NavLink>
										<Link to={`/project/edit/${item.id}`}>
											<img
												width="25px"
												src={editIcon}
												alt="project edit"
											/>
										</Link>
									</li>
								))}
							</ul>
						</div>
						<Link className="sideMenu__btn" to="/project/add">
							Add project
						</Link>
					</nav>
				)}
			</Transition>
		</>
	);
});

export { SideMenu };
