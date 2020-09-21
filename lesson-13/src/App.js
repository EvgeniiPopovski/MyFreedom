import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import "./App.css";
import { ConnectedCounterForm } from "./components/AddCounterForm/ConnectedCounterForm";
import { ConnectedEditCounterForm } from "./components/EditCounterForm/ConnectedEditCounterform";
import { ConnectedHomePage } from "./components/HomePage/ConnectedHomePage";
import { store } from "./redux/redux-store";

function App() {
	return (
		<BrowserRouter>
			<div className="container center">
				<div className="wrapper">
					<Provider store={store}>
						<Switch>
							<Route exact path="/">
								<Redirect to="/home" />
							</Route>

							<Route exact path="/home">
								<ConnectedHomePage />
							</Route>

							<Route exact path="/addCounter">
								<ConnectedCounterForm />
							</Route>

							<Route exact path="/counter/:counterId">
								<ConnectedEditCounterForm />
							</Route>
							<Route>
								<h1>Ooops... not found... sorry guys</h1>
							</Route>
						</Switch>
					</Provider>
				</div>
			</div>
		</BrowserRouter>
	);
}

export default App;
