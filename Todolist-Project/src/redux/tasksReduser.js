import { firestoreAPI } from "../firebaseAPI/firebase";
import { getUserId } from "./../components/Header/userSelector";

const GET_TASKS = "GET_TASKS";
const ADD_TASK = "ADD_TASK";
const EDIT_TASK = "EDIT_TASK";
const DELETE_TASK = "DELETE_TASK";
const KILL_PROJECT = "KILL_PROJECT";
const LOGOUT_USER_TASKS = "LOGOUT_USER_TASKS";
const LOADING_TASKS = "LOADING_TASKS";
const TASK_ERROR = "TASK_ERROR";

const InitialState = { tasks: {}, isLoading: false, taskError: null };

const taskReduser = (state = InitialState, action) => {
	switch (action.type) {
		case GET_TASKS:
			let stateCopy = { ...state };
			action.payload.tasks.forEach((task) => {
				stateCopy.tasks[task.id] = task;
			});
			return stateCopy;
		case ADD_TASK: {
			let stateCopy = { ...state };
			stateCopy.tasks[action.payload.task.id] = action.payload.task;
			return stateCopy;
		}
		case EDIT_TASK: {
			let stateCopy = { ...state };
			stateCopy.tasks[action.payload.task.id] = action.payload.task;
			return stateCopy;
		}
		case DELETE_TASK: {
			let stateCopy = { ...state };
			delete stateCopy.tasks[action.payload.taskId];
			return stateCopy;
		}
		case KILL_PROJECT: {
			let stateCopy = { ...state };
			for (let key in stateCopy.tasks) {
				if (stateCopy.tasks[key].projectId === action.payload.projectId) {
					delete stateCopy[key];
				}
			}
			return stateCopy;
		}
		case TASK_ERROR: {
			return {
				...state,
				taskError: action.payload.errorMessage,
			};
		}
		case LOGOUT_USER_TASKS:
			return  { tasks: {}, isLoading: false, taskError: null };

		case LOADING_TASKS:
			return { ...state, isLoading: action.payload.isLoading };
		default:
			return state;
	}
};

/*
! Actoin creators
*/
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
		type: LOGOUT_USER_TASKS,
	};
};

const loadingTasksAC = (bool) => {
	return {
		type: LOADING_TASKS,
		payload: {
			isLoading: bool,
		},
	};
};

const taskErrorAC = (errorMessage) => {
	return {
		type: TASK_ERROR,
		payload: {
			errorMessage,
		},
	};
};

/*
!THUNK 
*/

const getTasksThunk = (tasks) => {
	return async (dispatch, getState) => {
		try {
			dispatch(loadingTasksAC(true));
			const userId = getUserId(getState());
			let response = await firestoreAPI.getData("tasks", userId);
			let tasks = response.docs.map((doc) => {
				return { id: doc.id, ...doc.data() };
			});
			dispatch(getTasksAC(tasks));
		} catch (e) {
			dispatch(taskErrorAC(`Error oquired: ${e.message}.Please reload the page`));
		} finally {
			dispatch(loadingTasksAC(false));
		}
	};
};

const addTaskThunk = (task) => {
	return async (dispatch, getState) => {
		try {
			dispatch(loadingTasksAC(true));
			const response = await firestoreAPI.addItem("tasks", task);
			dispatch(addTaskAC(response));
		} catch (e) {
			dispatch(taskErrorAC(`Error oquired: ${e.message}.Please reload the page`));
		} finally {
			dispatch(loadingTasksAC(false));
		}
	};
};

const editTaskThunk = (task) => {
	return async (dispatch, getState) => {
		try {
			dispatch(editTaskAC(task));
			await firestoreAPI.updateItem("tasks", task.id, task);
		} catch (e) {
			dispatch(taskErrorAC(`Error oquired: ${e.message}.Please reload the page`));
		}
	};
};


const editTaskOnDragThunk = (taskId) => {
	console.log(taskId)
	return async (dispatch, getState) => {
		try {
			let taskToChange = getState().tasks.tasks[taskId]
			taskToChange.createdOn = Date.now().toString()
			taskToChange.date = (new Date()).toISOString().split('T')[0];
			console.log(taskToChange)
			dispatch(editTaskAC(taskToChange));
			await firestoreAPI.updateItem("tasks", taskToChange.id, taskToChange);
		} catch (e) {
			dispatch(taskErrorAC(`Error oquired: ${e.message}.Please reload the page`));
		}
	};
};

const deleteTaskThunk = (taskId) => {
	return async (dispatch, getState) => {
		try {
			dispatch(deleteTaskAC(taskId));
			await firestoreAPI.deleteItem("tasks", taskId);
		} catch (e) {
			dispatch(taskErrorAC(`Error oquired: ${e.message}. Please reload the page`));
		}
	};
};

const killProjectThunk = (projectId) => {
	return async (dispatch, getState) => {
		try {
			dispatch(killProjectAC(projectId));
			await firestoreAPI.deleteItem("tasks", projectId);
		} catch (e) {
			dispatch(taskErrorAC(`Error oquired: ${e.message}.Please reload the page`));
		}
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
	editTaskOnDragThunk
};
