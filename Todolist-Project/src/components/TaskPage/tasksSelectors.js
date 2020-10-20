const getTasksAsArray = (state) => {
	return  Object.values(state.tasks.tasks);
}

const getTasks = (state) => state.tasks.tasks;

const getTasksError = (state) => state.tasks.taskError;

const getFilteredTasksByProject = (state, filterCriteria) => {
	const filteredArray = state.filter((item) => item.projectId === filterCriteria);
	return filteredArray;
};
const getFilteredTasksByFocusedOn = (state) => {
	const filteredArray = state.filter((item) => item.isFocusedOn === true);
	return filteredArray;
};
const getTask = (state, id) => {
	return getTasks(state)[id];
};

// ! HERE
const sortTasksByTimeStmap = (array) => {
	return array.sort((a, b) => Number(b.createdOn) - Number(a.createdOn));
};

const sortTasksByIsDone = (state) => {
	console.log(state)
	return sortTasksByTimeStmap(state).sort((a, b) => a.isDone - b.isDone);
};
const getIsLoadingPTasks = (state) => {
	return state.tasks.isLoading;
};

const getExpriredTasks = (state, date , filterCriteria) => {
	let tasksArray = getTasksAsArray(state);
	let filtered = tasksArray.filter((task) =>  task.date < date);
	filtered = sortTasksByIsDone(filtered)
	let filteredArray = filtered.filter((item) => item.projectId === filterCriteria)
	return filteredArray
};

const getActualTasks = (state, date , filterCriteria) => {
	let tasksArray = getTasksAsArray(state);
	let filtered = tasksArray.filter((task) => task.date >= date);
	filtered = sortTasksByIsDone(filtered)
	let filteredArray = filtered.filter((item) => item.projectId === filterCriteria)
	console.log("actual: ", filteredArray)
	return filteredArray
};


export {
	getTasksError,
	getFilteredTasksByProject,
	getFilteredTasksByFocusedOn,
	getTask,
	sortTasksByIsDone,
	getIsLoadingPTasks,
	getExpriredTasks,
	getActualTasks,
	getTasksAsArray
};
