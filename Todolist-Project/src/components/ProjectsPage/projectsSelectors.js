const getProjectsAsArray = (state) => Object.values(state.projects.projects);

const getProject = (state, filterCriteria) => {
	return getProjectsAsArray(state).find((project) => project.id === filterCriteria);
};

const getProjectsError = (state) => {
	return state.projects.projectsError;
};

const getIsLoadingProgects = (state) => {
	return state.projects.isLoading;
};

export {
    getProject,
    getProjectsError,
    getIsLoadingProgects,
    getProjectsAsArray
}