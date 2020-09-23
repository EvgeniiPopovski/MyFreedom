
import React, { useEffect } from "react";


const SideMenu = ({projects , getProjects}) => {
	
	useEffect(() => {
		getProjects()
	},[])

    if (!projects) {
        return <h1>...loading...</h1>
    }
	return (
		<div>
			<h2>я сайд меню</h2>
			<ul>
				<li>Inbox</li>
				<li>Focus</li>
			</ul>
			<h2>Projects</h2>
			<ul>
				{projects.map((item) => (
					<li>{item.name}</li>
				))}
			</ul>
		</div>
	);
};

export { SideMenu };
