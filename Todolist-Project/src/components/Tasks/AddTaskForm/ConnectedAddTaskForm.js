import { connect } from "react-redux"
import { AddTaskForm } from "./AddTaskForm"
import {getProjectsAsArray} from '../../ProjectsPage/projectsSelectors'
import { getUserId} from './../../Header/userSelector'
import { addTaskThunk } from "../../../redux/tasksReduser"

const mapStateToProps = (state, ownProps) => {
    return {
        projects: getProjectsAsArray(state),
        selectedProjectId: ownProps.projectId,
        userId: getUserId(state),
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        saveTask : (task) => dispatch(addTaskThunk(task))
    }
}

const ConnectedAddTaskForm = connect(mapStateToProps, mapDispatchToProps)(AddTaskForm)

export {ConnectedAddTaskForm}