import {connect} from 'react-redux'
import { CreateCounterAC } from '../../redux/CounterReduser'
import { AddCounterForm } from './AddCounterForm'

const mapDispatchToProps = (dispatch) => {
    return {
        addCounter: (name , value) => dispatch(CreateCounterAC(name , value))
    }
}

const ConnectedCounterForm = connect( null , mapDispatchToProps)(AddCounterForm)

export {ConnectedCounterForm}