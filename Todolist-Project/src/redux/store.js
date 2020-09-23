import { createStore, applyMiddleware, combineReducers } from "redux";
import thunk from "redux-thunk";
import { projectsReduser } from "./projectsReduser";

const reduser = combineReducers({
	projects: projectsReduser,
});

const store = createStore(reduser, applyMiddleware(thunk));

export { store };
