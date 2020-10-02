import {connect} from 'react-redux'
import { getProjectsAsArray } from '../../../redux/selectors/Selectors'
import { deleteTaskThunk, editTaskThunk } from '../../../redux/tasksReduser'
import { EditTaskForm } from './EditTaskForm'

const mapStateToProps = (state , ownProps) => {
    return { 
        task : ownProps.task,
        projects: getProjectsAsArray(state), 
        showForm: ownProps.setEditMode,
        history : ownProps.history
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        editTask : (task) => dispatch(editTaskThunk(task)),
        deleteTask: (taskId) => dispatch(deleteTaskThunk(taskId))
    }
}

const ConnectedEditTaskForm = connect(mapStateToProps , mapDispatchToProps)(EditTaskForm)

export {ConnectedEditTaskForm}