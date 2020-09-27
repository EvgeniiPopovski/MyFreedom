import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import "./App.css";
import { ConnectedAddProjectForm } from "./components/Projects/AddProjectsForm/ConnectedAddProjectForm";
import { ConenctedEditProjectForm } from "./components/Projects/EditProjectForm/ConenctedEditProjectForm";
import { ConnectedSideMenu } from "./components/SideMenu/ConnectedSideMenu";
import { AddTaskForm } from "./components/Tasks/AddTaskForm/AddTaskForm";
import { ConnectedProjectPage } from "./components/common/ProjectsPage/ConectedProjectsPage";
import { ConnectedInboxPage } from "./components/common/ConnectedInboxPage/ConnectedInboxPage";
import { ConnectedFocusedPage } from "./components/common/ConnectedFocusedPage/ConnectedFocusedPage";
import { ConnectedTaskPage } from "./components/common/TaskPage/ConnectedTaskPage";

function App() {
	return (
		<Switch>
			<div className="grid_container nav_wide">
				<header className="header">
					<h1 className="header__title"> the best todolist ever </h1>
				</header>
				<ConnectedSideMenu />
				<Route exact path="/">
					<Redirect to="/Inbox" />
				</Route>
				
				<Route exact path='/Inbox'>
					<ConnectedInboxPage />
				</Route>
				<Route exact path='/Focused'>
					<ConnectedFocusedPage />
				</Route>
				<Route exact path="/project/add">
					<ConnectedAddProjectForm />
				</Route>
				<Route exact path='/project/:projectId' render={(routeProps) => <ConnectedProjectPage {...routeProps} />} />
				<Route
					exact
					path="/project/edit/:projectId"
					render={(routeProps) => <ConenctedEditProjectForm {...routeProps} />}
				/>
				<Route exact path='/task/add'>
					<AddTaskForm />
				</Route>
				<Route exact path='/task/info/:taskId' render={(routeProps) => <ConnectedTaskPage {...routeProps} />} />

				{/* <Route exact path="/inbox">
					<MainPage />
				</Route> */}
			</div>
			<Route>
				<h1>not found</h1>
			</Route>
		</Switch>
	);
}

export default App;
