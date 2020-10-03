import { firestoreAPI } from "../firebaseAPI/firebase";
import { killProjectThunk } from "./tasksReduser";
import { batch } from "react-redux";
import { getUserId } from "./selectors/Selectors";

const GET_PROJECTS = "GET_PROJECTS";
const ADD_PROJECT = "ADD_PROJECT";
const EDIT_PROJECT = "EDIT_PROJECT";
const DELETE_PROJECT = "DELETE_PROJECT";
const LOGOUT_USER = 'LOGOUT_USER'
const LOADING_PROJECTS = 'LOADING_PROJECTS'

const InitialState = { projects: {}, isLoading: false }

const projectsReduser = (state = InitialState, action) => {
	switch (action.type) {
		case GET_PROJECTS: {
			let stateCopy = { ...state };
			action.payload.projects.forEach((project) => {
				stateCopy.projects[project.id] = project;
			});
			return stateCopy;
		}
		case ADD_PROJECT: {
			let stateCopy = { ...state };
			stateCopy.projects[action.payload.project.id] = action.payload.project;
			return stateCopy;
		}
		case EDIT_PROJECT: {
			let stateCopy = { ...state }
			stateCopy.projects = { ...state.projects, [action.payload.project.id]: action.payload.project, }
			return stateCopy;
		};
		case DELETE_PROJECT: {
			let stateCopy = { ...state };
			delete stateCopy.projects[action.payload.projectId];
			return stateCopy;
		}
		case LOADING_PROJECTS: {
			return { ...state, isLoading: action.payload.isLoading }
		}
		case LOGOUT_USER:
			return InitialState
		default:
			return state;
	}
};


/*
! ACTION CREATORS
*/
const getProgectsAC = (projects) => {
	return {
		type: GET_PROJECTS,
		payload: {
			projects,
		},
	};
};

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

const loadingProjectsAC = (bool) => {
	return {
		type: LOADING_PROJECTS,
		payload: {
			isLoading: bool
		}
	}
}
/*
!THUNK
*/

const getProgectsThunk = () => {
	return async (dispatch, getState) => {
		dispatch(loadingProjectsAC(true))
		const userId = getUserId(getState())
		let response = await firestoreAPI.getData("projects", userId);
		let projects = response.docs.map((doc) => {
			return { id: doc.id, ...doc.data() };
		});
		dispatch(getProgectsAC(projects));
		dispatch(loadingProjectsAC(false))
	};
};

//! addProfectAC receives obj as a parametr
const addProjectThunk = (project) => {
	return async (dispatch, getState) => {
		dispatch(loadingProjectsAC(true))
		let response = await firestoreAPI.addItem("projects", project);
		dispatch(addProjectAC(response));
		dispatch(loadingProjectsAC(false))
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
