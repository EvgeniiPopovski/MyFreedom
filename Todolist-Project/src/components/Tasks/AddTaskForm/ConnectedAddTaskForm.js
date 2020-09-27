import { connect } from "react-redux"
import { AddTaskForm } from "./AddTaskForm"
import {getProjectsAsArray} from '../../../redux/selectors/Selectors'
import { addTaskThunk } from "../../../redux/tasksReduser"

const mapStateToProps = (state) => {
    return {
        projects: getProjectsAsArray(state)
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        saveTask : (task) => dispatch(addTaskThunk(task))
    }
}

const ConnectedAddTaskForm = connect(mapStateToProps, mapDispatchToProps)(AddTaskForm)

export {ConnectedAddTaskForm}