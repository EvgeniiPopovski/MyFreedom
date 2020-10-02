import { createStore, applyMiddleware, combineReducers, compose } from "redux";
import thunk from "redux-thunk";
import { loadingReduser } from "./loadingState";
import { projectsReduser } from "./projectsReduser";
import {taskReduser} from './tasksReduser'
import { userReduser } from "./userReduser";


const reduser = combineReducers({
	projects: projectsReduser,
	tasks: taskReduser,
	user: userReduser,
	isLoading: loadingReduser
});

const composeEnhancers =
	typeof window === "object" && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
		? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
				// Specify extension’s options like name, actionsBlacklist, actionsCreators, serialize...
		  })
		: compose;

const store = createStore(reduser, composeEnhancers(applyMiddleware(thunk)));

window.store = store;

export { store };
