import {connect} from 'react-redux'
import { getProject } from './../ProjectsPage/projectsSelectors'
import {  getTask } from './tasksSelectors'
import { editTaskThunk } from './../../redux/tasksReduser'
import { TaskPage } from './TaskPage'

const mapStateToProps = (state, ownProps) => {
    const taskId = ownProps.match.params.taskId
    return {
        task : getTask(state , taskId),
        project:   getTask(state , taskId) && getProject(state , getTask(state , taskId).projectId),
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        editTask: (task) => dispatch(editTaskThunk(task))
    }
}

const ConnectedTaskPage = connect(mapStateToProps , mapDispatchToProps)(TaskPage)

export {ConnectedTaskPage}