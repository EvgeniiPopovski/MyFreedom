import {connect} from 'react-redux'
import { deleteCounterAC, editCounterAC } from '../../redux/CounterReduser'
import { EditCounterForm } from './EditCounterForm'

const mapStateToProps = (state) => {
    return {
        counters: state.counters
    }
} 

const mapDispatchToProps = (dispatch) => {
    return {
        editCounter: (name , value, counterId) => dispatch(editCounterAC(name , value , counterId)),
        deleteCounter: (counterId) => dispatch(deleteCounterAC(counterId)) 
    }
}


const ConnectedEditCounterForm = connect(mapStateToProps , mapDispatchToProps)(EditCounterForm)

export {ConnectedEditCounterForm}