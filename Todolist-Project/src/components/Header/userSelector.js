const getUser = (state) => {
	return state.user.user;
};
const getUserId = (state) => {
	return state.user.user.uid;
};

const getIsLoadingProgects = (state) => {
	return state.projects.isLoading;
};

const getIsLoadingUser = (state) => {
	return state.user.isLoading;
};

const getUserError = (state) => {
	return state.user.userError;
};

export {
    getUser,
    getUserId,
    getIsLoadingProgects,
    getIsLoadingUser,
    getUserError
}