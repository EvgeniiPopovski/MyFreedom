import { connect } from 'react-redux'
import { decValueAC, deleteCounterAC, editCounterAC, incValueAC } from '../../redux/CounterReduser'
import { HomePage } from './HomePage'

const mapStateToProps = (state) => {
    return {
        counters: state.counters
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        increment: (name, value, counterId) => dispatch(incValueAC(name, value, counterId)),
        decrement: (name, value, counterId) => dispatch(decValueAC(name, value, counterId)),
        editCounter: (name , value , counterId) => dispatch(editCounterAC(name , value , counterId)),
        deleteCounter: (counterId) => dispatch(deleteCounterAC(counterId))
    }
}

const ConnectedHomePage = connect(mapStateToProps, mapDispatchToProps)(HomePage)

export { ConnectedHomePage }