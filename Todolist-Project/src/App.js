import React from "react";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import "./App.css";
import { ConnectedAddProjectForm } from "./components/Projects/AddProjectsForm/ConnectedAddProjectForm";
import { ConenctedEditProjectForm } from "./components/Projects/EditProjectForm/ConenctedEditProjectForm";
import { ConnectedSideMenu } from "./components/SideMenu/ConnectedSideMenu";
import { AddTaskForm } from "./components/Tasks/AddTaskForm/AddTaskForm";
import { ConnectedProjectPage } from "./components/common/ProjectsPage/ConectedProjectsPage";
import { ConnectedInboxPage } from "./components/common/ConnectedInboxPage/ConnectedInboxPage";
import { ConnectedFocusedPage } from "./components/common/ConnectedFocusedPage/ConnectedFocusedPage";
import { ConnectedTaskPage } from "./components/common/TaskPage/ConnectedTaskPage";
import { WelcomePage } from "./components/WelcomePage/WelcomePage";
import { ConnectedRegistrationForm } from "./components/RegistrationForm/ConnectedRegistrationForm";
import { ConnectedLoginForm } from "./components/LoginForm/ConnectedLogin";
import { ConnectedHeader } from "./components/Header/ConnectedHeader";

function App({ user }) {
	return (
		<BrowserRouter>
			<div className="grid_container nav_wide">
				<ConnectedHeader />
				{!user ? (
					<Switch>
						<Route exact path="/">
							<Redirect to="/welcomePage" />
						</Route>
						<Route exact path="/welcomePage">
							<WelcomePage />
						</Route>
						<Route exact path="/registration">
							<ConnectedRegistrationForm />
						</Route>
						<Route exact path="/login">
							<ConnectedLoginForm />
						</Route>
						<Route>
							<Redirect to="/welcomePage"/>
						</Route>
					</Switch>
				) : (
					<>
						<ConnectedSideMenu />
						<Switch>
							<Route exact path="/">
								<Redirect to="/Inbox" />
							</Route>
							<Route exact path="/welcomePage">
								<Redirect to="/Inbox" />
							</Route>
							<Route exact path="/Inbox">
								<ConnectedInboxPage />
							</Route>
							<Route exact path="/Focused">
								<ConnectedFocusedPage />
							</Route>
							<Route exact path="/project/add">
								<ConnectedAddProjectForm />
							</Route>
							<Route
								exact
								path="/project/:projectId"
								render={(routeProps) => (
									<ConnectedProjectPage {...routeProps} />
								)}
							/>
							<Route
								exact
								path="/project/edit/:projectId"
								render={(routeProps) => (
									<ConenctedEditProjectForm {...routeProps} />
								)}
							/>
							<Route exact path="/task/add">
								<AddTaskForm />
							</Route>
							<Route
								exact
								path="/task/info/:taskId"
								render={(routeProps) => (
									<ConnectedTaskPage {...routeProps} />
								)}
							/>
							<Route>
								<h1>not found</h1>
							</Route>
						</Switch>
					</>
				)}
			</div>
		</BrowserRouter>
	);
}

export default App;
