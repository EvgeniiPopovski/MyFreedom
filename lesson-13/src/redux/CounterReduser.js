const CREATE_COUNTRER = 'CREATE_COUNTER'
const INCREMENT = 'INCREMENT'
const DECREMENT = 'DECREMENT'


const initialState = {
    counters: []
}

const CounterReduser = (state = initialState, action) => {
    switch (action.type) {
        case CREATE_COUNTRER:
            return { ...state, counters: [...state.counters, action.payload.counter] }
        case INCREMENT:
            let stateCopy = { ...state }
            let obj = state.counters.find(counter => action.payload.counter.counterId === counter.id)
            let counterIndex = state.counters.indexOf(obj)
            stateCopy.counters = [...state.counters.slice(0, counterIndex-1),
            {
                name: action.payload.counter.name,
                value: action.payload.counter.value,
                counterId: action.payload.counter.counterId
            }, ...state.counters.slice(counterIndex + 1)]

            return stateCopy
        default: return state
    }
}

const CreateCounterAC = (name, value) => {
    return {
        type: CREATE_COUNTRER,
        payload: {
            counter: { name, value, id: Date.now().toString() }
        }
    }
}

const incValueAC = (name, value, counterId) => {
    return {
        type: INCREMENT,
        payload: {
            counter: { name, value, counterId }
        }
    }
}

export { CounterReduser, CreateCounterAC , incValueAC}