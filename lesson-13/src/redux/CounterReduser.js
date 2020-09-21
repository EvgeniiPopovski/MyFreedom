const CREATE_COUNTRER = "CREATE_COUNTER";
const INCREMENT = "INCREMENT";
const DECREMENT = "DECREMENT";
const EDIT_COUNTER = "EDIT_COUNTER";
const DELETE_COUNTER = "DELETE_COUNTER";

const changeObjInState = (state, criteria, newObj) => {
	let stateCopy = { ...state };
	let obj = state.counters.find((counter) => criteria === counter.id);
	let counterIndex = state.counters.indexOf(obj);
	stateCopy.counters = [
		...state.counters.slice(0, counterIndex),
		newObj,
		...state.counters.slice(counterIndex + 1),
	];
	return stateCopy;
};

const initialState = {
	counters: [],
};

const CounterReduser = (state = initialState, action) => {
	switch (action.type) {
		case CREATE_COUNTRER:
			return { ...state, counters: [...state.counters, action.payload.counter] };

		case INCREMENT: {
			return changeObjInState(state, action.payload.counter.counterId, {
				name: action.payload.counter.name,
				value: action.payload.counter.value,
				id: action.payload.counter.counterId,
			});
		}

		case DECREMENT: {
			return changeObjInState(state, action.payload.counter.counterId, {
				name: action.payload.counter.name,
				value: action.payload.counter.value,
				id: action.payload.counter.counterId,
			});
        }
        
        case EDIT_COUNTER : {
            return changeObjInState(state, action.payload.counter.counterId, {
				name: action.payload.counter.name,
				value: action.payload.counter.value,
				id: action.payload.counter.counterId,
			});
        }

        case DELETE_COUNTER : {
            return {...state , counters: [...state.counters.filter(counter => counter.id !== action.payload.counterId)]}
        }

		default:
			return state;
	}
};

const CreateCounterAC = (name, value) => {
	return {
		type: CREATE_COUNTRER,
		payload: {
			counter: { name, value, id: Date.now().toString() },
		},
	};
};

const incValueAC = (name, value, counterId) => {
	return {
		type: INCREMENT,
		payload: {
			counter: { name, value, counterId },
		},
	};
};
const decValueAC = (name, value, counterId) => {
	return {
		type: DECREMENT,
		payload: {
			counter: { name, value, counterId },
		},
	};
};

const editCounterAC = (name, value, counterId) => {
	return {
		type: EDIT_COUNTER,
		payload: {
			counter: { name, value, counterId },
		},
	};
};

const deleteCounterAC = (counterId) => {
	return {
		type: DELETE_COUNTER,
		payload: {
			counterId: counterId,
		},
	};
};

export {
	CounterReduser,
	CreateCounterAC,
	incValueAC,
	decValueAC,
	editCounterAC,
	deleteCounterAC,
};
