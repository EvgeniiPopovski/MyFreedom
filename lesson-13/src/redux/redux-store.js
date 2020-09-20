import { createStore } from 'redux'
import { CounterReduser } from './CounterReduser'

const store = createStore(CounterReduser, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())

export { store }