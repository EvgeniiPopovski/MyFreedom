import React, { useState } from "react";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import "./App.scss";
import { ConnectedAddProjectForm } from "./components/Projects/AddProjectsForm/ConnectedAddProjectForm";
import { ConenctedEditProjectForm } from "./components/Projects/EditProjectForm/ConenctedEditProjectForm";
import { ConnectedSideMenu } from "./components/SideMenu/ConnectedSideMenu";
import { AddTaskForm } from "./components/Tasks/AddTaskForm/AddTaskForm";
import { ConnectedTaskPage } from "./components/TaskPage/ConnectedTaskPage";
import { WelcomePage } from "./components/WelcomePage/WelcomePage";
import { ConnectedRegistrationForm } from "./components/RegistrationForm/ConnectedRegistrationForm";
import { ConnectedLoginForm } from "./components/LoginForm/ConnectedLogin";
import { ConnectedHeader } from "./components/Header/ConnectedHeader";
import { Preloader } from "./components/common/Preloader/Preloader";
import { ErrorMessage } from "./components/common/ErrorMessage/ErrorMessage";
import { ConnectedFocusedPage } from "./components/ConnectedFocusedPage/ConnectedFocusedPage";
import { ConnectedInboxPage } from "./components/ConnectedInboxPage/ConnectedInboxPage";
import { ConnectedProjectPage } from "./components/ProjectsPage/ConectedProjectsPage";

function App({ user, isLoading, errors }) {
	const [showMenu, setShowMenu] = useState(true);
	if (isLoading) {
		return <Preloader />;
	}
	return (
		<BrowserRouter>
			<div className="app-containter">
				<ConnectedHeader showMenu={showMenu} setShowMenu={setShowMenu} />
				{errors.project && <ErrorMessage errorTxt={errors.project} />}
				{errors.task && <ErrorMessage errorTxt={errors.task} />}
				{!user ? (
					<div className="app-container__body">
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
								<Redirect to="/welcomePage" />
							</Route>
						</Switch>
					</div>
				) : (
					<>
						<div className="app-container__body">
							<ConnectedSideMenu showMenu={showMenu} />
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
								<Route to path="/login">
									<Redirect to="/inbox" />
								</Route>
								<Route to path="/registration">
									<Redirect to="/inbox" />
								</Route>
								<Route>
									<h1>not found</h1>
								</Route>
							</Switch>
						</div>
					</>
				)}
			</div>
		</BrowserRouter>
	);
}

export default App;
