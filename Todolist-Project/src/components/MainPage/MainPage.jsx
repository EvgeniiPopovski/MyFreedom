import React from "react";
import { ConnectedAddTaskForm } from "../Tasks/AddTaskForm/ConnectedAddTaskForm";

const MainPage = ({ projects }) => {

	return (
		<main className="main">
			<h1>This is Main page</h1>
			<h2>Inbox</h2>
			<ConnectedAddTaskForm />
		</main>
	);
};

export { MainPage };
