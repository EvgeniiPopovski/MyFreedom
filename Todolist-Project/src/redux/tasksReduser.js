import { firestoreAPI } from "../firebaseAPI/firebase";

const GET_TASKS = 'GET_TASKS'
const ADD_TASK = 'ADD_TASK'
const EDIT_TASK = 'EDIT_TASK'
const DELETE_TASK = 'DELETE_TASK'

const taskReduser = (state = {}, action) => {
	switch (action.type) {
		case GET_TASKS:
			let stateCopy = { ...state };
			action.payload.tasks.forEach((task) => {
				stateCopy[task.id] = task;
			});
			return stateCopy
		case ADD_TASK: {
			let stateCopy = { ...state };
			stateCopy[action.payload.task.id] = action.payload.task
			return stateCopy
		}
		case EDIT_TASK: {
			let stateCopy = { ...state };
			stateCopy[action.payload.task.id] = action.payload.task
			return stateCopy
		}
		case DELETE_TASK: {
			let stateCopy = { ...state };
			delete stateCopy[action.payload.taskId]
			return stateCopy
		}
		default:
			return state;
	}
};

const getTasksAC = (tasks) => {
	return {
		type: GET_TASKS,
		payload: {
			tasks
		}
	}
}

//! receives an obj as a parametr
const addTaskAC = (task) => {
	return {
		type: ADD_TASK,
		payload: {
			task
		}
	}
}

const editTaskAC = (task) => {
	return {
		type: EDIT_TASK,
		payload: {
			task
		}
	}
}

const deleteTaskAC = (taskId) => {
	return {
		type: DELETE_TASK,
		payload: {
			taskId
		}
	}
}

/*
!THUNK 
*/

const getTasksThunk = (tasks) => {
	return async (dispatch, getState) => {
		let response = await firestoreAPI.getData('tasks')
		let tasks = response.docs.map((doc) => {
			return { id: doc.id, ...doc.data() };
		});
		dispatch(getTasksAC(tasks))
	}
}


const addTaskThunk = (task) => {
	return async (dispatch, getState) => {
		const response = await firestoreAPI.addItem('tasks', task)
		dispatch(addTaskAC(response))
	}
}

const editTaskThunk = (task) => {
	return async (dispatch, getState) => {
		dispatch(editTaskAC(task));
		await firestoreAPI.updateItem("tasks", task.id, task);
	}
}

const deleteTaskThunk = (taskId) => {
	return async (dispatch, getState) => {
		dispatch(deleteTaskAC(taskId))
		await firestoreAPI.deleteItem('tasks', taskId)
	}
}



export { taskReduser, getTasksThunk, addTaskThunk, editTaskThunk, deleteTaskThunk };
