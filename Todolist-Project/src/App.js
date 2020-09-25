import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import "./App.css";
import { ConnectedAddProjectForm } from "./components/Projects/AddProjectsForm/ConnectedAddProjectForm";
import { ConenctedEditProjectForm } from "./components/Projects/EditProjectForm/ConenctedEditProjectForm";
import { MainPage } from "./components/MainPage/MainPage";
import { ConnectedSideMenu } from "./components/SideMenu/ConnectedSideMenu";
import { AddTaskForm } from "./components/Tasks/AddTaskForm/AddTaskForm";

function App() {
	return (
		<Switch>
			<div className="grid_container nav_wide">
				<header className="header">
					<h1 className="header__title"> the best todolist ever </h1>
				</header>

				<ConnectedSideMenu />

				<Route exact path="/">
					<Redirect to="/inbox" />
				</Route>

				<Route exact path="/project/add">
					<ConnectedAddProjectForm />
				</Route>

				<Route
					exact
					path="/project/edit/:projectId"
					render={(routeProps) => <ConenctedEditProjectForm {...routeProps} />}
				/>

				<Route exact path='/task/add'>
					<AddTaskForm />
				</Route>

				<Route exact path="/inbox">
					<MainPage />
				</Route>
			</div>
			<Route>
				<h1>not found</h1>
			</Route>
		</Switch>
	);
}

export default App;
