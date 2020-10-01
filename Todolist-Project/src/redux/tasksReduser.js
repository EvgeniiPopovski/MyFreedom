import { firestoreAPI } from "../firebaseAPI/firebase";
import { getUserId } from "./selectors/Selectors";

const GET_TASKS = "GET_TASKS";
const ADD_TASK = "ADD_TASK";
const EDIT_TASK = "EDIT_TASK";
const DELETE_TASK = "DELETE_TASK";
const KILL_PROJECT = "KILL_PROJECT";
const LOGOUT_USER = "LOGOUT_USER";

const taskReduser = (state = {}, action) => {
	switch (action.type) {
		case GET_TASKS:
			let stateCopy = { ...state };
			action.payload.tasks.forEach((task) => {
				stateCopy[task.id] = task;
			});
			return stateCopy;
		case ADD_TASK: {
			let stateCopy = { ...state };
			stateCopy[action.payload.task.id] = action.payload.task;
			return stateCopy;
		}
		case EDIT_TASK: {
			let stateCopy = { ...state };
			stateCopy[action.payload.task.id] = action.payload.task;
			return stateCopy;
		}
		case DELETE_TASK: {
			let stateCopy = { ...state };
			delete stateCopy[action.payload.taskId];
			return stateCopy;
		}
		case KILL_PROJECT: {
			let stateCopy = { ...state };
			for (let key in stateCopy) {
				if (stateCopy[key].projectId === action.payload.projectId) {
					delete stateCopy[key];
				}
			}
			return stateCopy;
		}
		case LOGOUT_USER:
			return {};
		default:
			return state;
	}
};

const getTasksAC = (tasks) => {
	return {
		type: GET_TASKS,
		payload: {
			tasks,
		},
	};
};

//! receives an obj as a parametr
const addTaskAC = (task) => {
	return {
		type: ADD_TASK,
		payload: {
			task,
		},
	};
};

const editTaskAC = (task) => {
	return {
		type: EDIT_TASK,
		payload: {
			task,
		},
	};
};

const deleteTaskAC = (taskId) => {
	return {
		type: DELETE_TASK,
		payload: {
			taskId,
		},
	};
};

const killProjectAC = (projectId) => {
	return {
		type: KILL_PROJECT,
		payload: {
			projectId,
		},
	};
};

const onLogoutTasksAC = () => {
	return {
		type: LOGOUT_USER,
	};
};

/*
!THUNK 
*/

const getTasksThunk = (tasks) => {
	return async (dispatch, getState) => {
		const userId = getUserId(getState());
		let response = await firestoreAPI.getData("tasks", userId);
		let tasks = response.docs.map((doc) => {
			return { id: doc.id, ...doc.data() };
		});
		dispatch(getTasksAC(tasks));
	};
};

const addTaskThunk = (task) => {
	return async (dispatch, getState) => {
		const response = await firestoreAPI.addItem("tasks", task);
		dispatch(addTaskAC(response));
	};
};

const editTaskThunk = (task) => {
	return async (dispatch, getState) => {
		dispatch(editTaskAC(task));
		await firestoreAPI.updateItem("tasks", task.id, task);
	};
};

const deleteTaskThunk = (taskId) => {
	return async (dispatch, getState) => {
		dispatch(deleteTaskAC(taskId));
		await firestoreAPI.deleteItem("tasks", taskId);
	};
};

const killProjectThunk = (projectId) => {
	return async (dispatch, getState) => {
		dispatch(killProjectAC(projectId));
		await firestoreAPI.deleteItem("tasks", projectId);
	};
};

export {
	taskReduser,
	getTasksThunk,
	addTaskThunk,
	editTaskThunk,
	deleteTaskThunk,
	killProjectThunk,
	onLogoutTasksAC,
};
