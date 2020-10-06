import {connect} from 'react-redux'
import { getFilteredTasksByFocusedOn, getIsLoadingPTasks, sortTasksByIsDone } from '../../../redux/selectors/Selectors'
import { editTaskThunk } from '../../../redux/tasksReduser'
import { ProjectPage } from '../ProjectsPage/ProjectsPage'

const mapStateToProps = (state) => {
    return {
        tasks: getFilteredTasksByFocusedOn( sortTasksByIsDone(state)),
        project: {name: 'Focused on'},
        isLoading: getIsLoadingPTasks(state),
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        editTask : (task) => dispatch(editTaskThunk(task)),
    }
}

const ConnectedFocusedPage = connect (mapStateToProps , mapDispatchToProps)(ProjectPage)

export {ConnectedFocusedPage}