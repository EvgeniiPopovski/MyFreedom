import { connect } from 'react-redux'
import { incValueAC } from '../../redux/CounterReduser'
import { HomePage } from './HomePage'

const mapStateToProps = (state) => {
    return {
        counters: state.counters
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        increment: (name, value, counterId) => dispatch(incValueAC(name, value, counterId))
    }
}

const ConnectedHomePage = connect(mapStateToProps, mapDispatchToProps)(HomePage)

export { ConnectedHomePage }