const getProjectsAsArray = (state) => Object.values(state.projects.projects);

const getTasksAsArray = (state) => Object.values(state.tasks.tasks);

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
const getProject = (state, filterCriteria) => {
	return getProjectsAsArray(state).find((project) => project.id === filterCriteria);
};

const getProjectsError = (state) => {
	return state.projects.projectsError;
};

const getTask = (state, id) => {
	return getTasks(state)[id];
};

const sortTasksByTimeStmap = (state) => {
	return getTasksAsArray(state).sort(
		(a, b) => Number(b.createdOn) - Number(a.createdOn)
	);
};

const sortTasksByIsDone = (state) => {
	return sortTasksByTimeStmap(state).sort((a, b) => a.isDone - b.isDone);
};

const getUser = (state) => {
	return state.user.user;
};
const getUserId = (state) => {
	return state.user.user.uid;
};

const getIsLoadingProgects = (state) => {
	return state.projects.isLoading;
};
const getIsLoadingPTasks = (state) => {
	return state.tasks.isLoading;
};

const getIsLoadingUser = (state) => {
	return state.user.isLoading;
};

const getUserError = (state) => {
	return state.user.userError;
};

export {
	getProjectsAsArray,
	getTasksAsArray,
	getFilteredTasksByProject,
	getProject,
	getFilteredTasksByFocusedOn,
	getTask,
	sortTasksByTimeStmap,
	sortTasksByIsDone,
	getUser,
	getUserId,
	getIsLoadingProgects,
	getIsLoadingPTasks,
	getIsLoadingUser,
	getUserError,
	getProjectsError,
	getTasksError,
};
