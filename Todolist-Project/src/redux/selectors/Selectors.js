const getProjectsAsArray = (state) => Object.values(state.projects);

const getTasksAsArray = (state) => Object.values(state.tasks);

const getTasks = (state) => state.tasks;

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

const getTask = (state, id) => {
	return getTasks(state)[id];
};

const sortTasksByTimeStmap = (state) =>{ 
    
    return getTasksAsArray(state).sort( (a, b) => Number(b.createdOn) - Number(a.createdOn) )
}

const sortTasksByIsDone = (state) => {
    return sortTasksByTimeStmap(state).sort( (a , b ) => a.isDone - b.isDone )
}

const getUser = (state) => {
	return state.user
}

export {
	getProjectsAsArray,
	getTasksAsArray,
	getFilteredTasksByProject,
	getProject,
	getFilteredTasksByFocusedOn,
    getTask,
    sortTasksByTimeStmap,
	sortTasksByIsDone,
	getUser
};
