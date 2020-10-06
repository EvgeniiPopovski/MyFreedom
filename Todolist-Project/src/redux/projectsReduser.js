import { firestoreAPI } from "../firebaseAPI/firebase";
import { killProjectThunk } from "./tasksReduser";
import { batch } from "react-redux";
import { getUserId } from "./selectors/Selectors";

const GET_PROJECTS = "GET_PROJECTS";
const ADD_PROJECT = "ADD_PROJECT";
const EDIT_PROJECT = "EDIT_PROJECT";
const DELETE_PROJECT = "DELETE_PROJECT";
const LOGOUT_USER_PROJECTS = 'LOGOUT_USER_PROJECTS'
const LOADING_PROJECTS = 'LOADING_PROJECTS'
const PROJECTS_ERROR = 'PROJECTS_ERROR'

const InitialState = { projects: {}, isLoading: false, projectsError: null }

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
		case PROJECTS_ERROR: {
			return { ...state, projectsError: action.payload.errorMessage }
		}
		case LOGOUT_USER_PROJECTS:
			return  { projects: {}, isLoading: false, projectsError: null }
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
		type: LOGOUT_USER_PROJECTS
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

const projectsErrorAC = (errorMessage) => {
	return {
		type: PROJECTS_ERROR,
		payload: {
			errorMessage
		}
	}
}
/*
!THUNK
*/

const getProgectsThunk = () => {
	return async (dispatch, getState) => {
		try {
			dispatch(loadingProjectsAC(true))
			const userId = getUserId(getState())
			let response = await firestoreAPI.getData("projects", userId);
			let projects = response.docs.map((doc) => {
				return { id: doc.id, ...doc.data() };
			});
			dispatch(getProgectsAC(projects));
		} catch (e) {
			dispatch(projectsErrorAC(`Error oquired: ${e.message}.Please reload the page`))
		} finally {
			dispatch(loadingProjectsAC(false))
		}

	};
};

//! addProfectAC receives obj as a parametr
const addProjectThunk = (project) => {
	return async (dispatch, getState) => {
		try {
			dispatch(loadingProjectsAC(true))
			let response = await firestoreAPI.addItem("projects", project);
			dispatch(addProjectAC(response));
		} catch (e) {
			dispatch(projectsErrorAC(`Error oquired: ${e.message}.Please reload the page`))
		} finally {
			dispatch(loadingProjectsAC(false))
		}

	};
};

const editProjectThunk = (project) => {
	return async (dispatch, getState) => {
		try {
			dispatch(editProjectAC(project));
			await firestoreAPI.updateItem("projects", project.id, project);
		} catch (e) {
			dispatch(projectsErrorAC(`Error oquired: ${e.message}.Please reload the page`))
		}

	};
};

//! SHOULD KILL ALL THE TASKS CORRESPONDING TO THIS PROJECT
const deleteProjectThunk = (projectId) => {
	return async (dispatch, getState) => {
		try {
			batch(() => {
				dispatch(deleteProjectAC(projectId));
				dispatch(killProjectThunk(projectId));
			});
			await firestoreAPI.deleteItem("projects", projectId);
		} catch (e) {
			dispatch(projectsErrorAC(`Error oquired: ${e.message}.Please reload the page`))		}

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
