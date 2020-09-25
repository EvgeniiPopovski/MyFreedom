import { createStore, applyMiddleware, combineReducers, compose } from "redux";
import thunk from "redux-thunk";
import { projectsReduser } from "./projectsReduser";
import {taskReduser} from './tasksReduser'
const reduser = combineReducers({
	projects: projectsReduser,
	tasks: taskReduser,
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
