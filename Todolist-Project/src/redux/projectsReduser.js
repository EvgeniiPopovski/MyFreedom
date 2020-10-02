import { firestoreAPI } from "../firebaseAPI/firebase";
import { killProjectThunk } from "./tasksReduser";
import { batch } from "react-redux";
import { getUserId } from "./selectors/Selectors";

const GET_PROJECTS = "GET_PROJECTS";
const ADD_PROJECT = "ADD_PROJECT";
const EDIT_PROJECT = "EDIT_PROJECT";
const DELETE_PROJECT = "DELETE_PROJECT";
const LOGOUT_USER = 'LOGOUT_USER'

const projectsReduser = (state = {}, action) => {
	switch (action.type) {
		case GET_PROJECTS: {
			let stateCopy = { ...state };
			action.payload.projects.forEach((project) => {
				stateCopy[project.id] = project;
			});
			return stateCopy;
		}
		case ADD_PROJECT: {
			let stateCopy = { ...state };
			stateCopy[action.payload.project.id] = action.payload.project;
			return stateCopy;
		}
		case EDIT_PROJECT: {
			let stateCopy = {
				...state,
				[action.payload.project.id]: action.payload.project,
			};
			return stateCopy;
		}
		case DELETE_PROJECT: {
			let stateCopy = { ...state };
			delete stateCopy[action.payload.projectId];
			return stateCopy;
		}
		case LOGOUT_USER : 
			return {}
		default:
			return state;
	}
};

const getProgectsAC = (projects) => {
	return {
		type: GET_PROJECTS,
		payload: {
			projects,
		},
	};
};

/*
! ACTION CREATORS
*/

//! addProfectAC receives obj as a parametr
const addProjectAC = (project) => {
	return {
		type: ADD_PROJECT,
		payload: {
			project,
		},
	};
};

//! receives obj as a parametr
const editProjectAC = (project) => {
	return {
		type: EDIT_PROJECT,
		payload: {
			project,
		},
	};
};

//! receives id as a parametr
const deleteProjectAC = (projectId) => {
	return {
		type: DELETE_PROJECT,
		payload: {
			projectId,
		},
	};
};

const onLogoutProjectstAC = () => {
	return {
		type: LOGOUT_USER
	};
};

/*
!THUNK
*/

const getProgectsThunk = () => {
	return async (dispatch, getState) => {
		const userId = getUserId(getState())
		let response = await firestoreAPI.getData("projects" , userId);
		let projects = response.docs.map((doc) => {
			return { id: doc.id, ...doc.data() };
		});
		dispatch(getProgectsAC(projects));
	};
};

//! addProfectAC receives obj as a parametr
const addProjectThunk = (project) => {
	return async (dispatch, getState) => {
		let response = await firestoreAPI.addItem("projects", project);
		dispatch(addProjectAC(response));
	};
};

const editProjectThunk = (project) => {
	return async (dispatch, getState) => {
		dispatch(editProjectAC(project));
		await firestoreAPI.updateItem("projects", project.id, project);
	};
};

//! SHOULD KILL ALL THE TASKS CORRESPONDING TO THIS PROJECT
const deleteProjectThunk = (projectId) => {
	return async (dispatch, getState) => {
		batch(() => {
			dispatch(deleteProjectAC(projectId));
			dispatch(killProjectThunk(projectId));
		});
		await firestoreAPI.deleteItem("projects", projectId);
	};
};

export {
	projectsReduser,
	getProgectsThunk,
	addProjectThunk,
	editProjectThunk,
	deleteProjectThunk,
	onLogoutProjectstAC
};
