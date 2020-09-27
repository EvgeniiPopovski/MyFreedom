import React, { useEffect } from "react";
import { Link } from "react-router-dom";

const SideMenu = ({ projects, getProjects, getTasks }) => {
	useEffect(() => {
		getProjects();
		getTasks();
	}, [getProjects, getTasks]);

	if (!projects) {
		return <h1>...loading...</h1>;
	}
	return (
		<nav className="nav">
			<div>
				<h2>я сайд меню</h2>
				<ul>
					<p><Link to='/Inbox'> Inbox</Link></p>
					<p><Link to='/Focused'>Focus</Link></p>
				</ul>
				<h2>Projects</h2>
				<ul>
					{projects.map((item) => (
						<li key={item.id}>
							<Link to={`/project/${item.id}`}>{item.name}</Link> <Link to={`/project/edit/${item.id}`}> edit </Link>
						</li>
					))}
				</ul>
				<Link to="/project/add">Add project</Link>
			</div>
		</nav>
	);
};

export { SideMenu };
