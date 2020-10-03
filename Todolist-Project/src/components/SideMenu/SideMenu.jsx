import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Preloader } from "./../common/Preloader/Preloader";
import './SideMenu.scss'

const SideMenu = ({ projects, getProjects, getTasks, isLoading }) => {
	const [wideMenu, setWideMenu] = useState(true);

	useEffect(() => {
		getProjects();
		getTasks();
	}, [getProjects, getTasks]);

	return (
		<>
			<nav className="navigation">
				<button onClick={() => setWideMenu(false)}>Close Menu</button>
				<div>
					<h2>я сайд меню</h2>
					<ul>
						<p>
							<Link to="/Inbox"> Inbox</Link>
						</p>
						<p>
							<Link to="/Focused">Focus</Link>
						</p>
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
