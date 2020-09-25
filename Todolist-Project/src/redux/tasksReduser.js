const GET_TASKS = 'GET_TASKS'

const taskReduser = (state = {}, action) => {
	switch (action.type) {
        case GET_TASKS : 
        let stateCopy = { ...state };
			action.payload.tasks.forEach((task) => {
				stateCopy[task.id] = task;
			});
			return stateCopy
		default:
			return state;
	}
};


export { taskReduser };
