import {connect} from 'react-redux'
import { getFilteredTasksByFocusedOn, sortTasksByIsDone } from '../../../redux/selectors/Selectors'
import { editTaskThunk } from '../../../redux/tasksReduser'
import { ProjectPage } from '../ProjectsPage/ProjectsPage'

const mapStateToProps = (state) => {
    return {
        tasks: getFilteredTasksByFocusedOn( sortTasksByIsDone(state)),
        project: {name: 'Focused on'}
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        editTask : (task) => dispatch(editTaskThunk(task)),
    }
}

const ConnectedFocusedPage = connect (mapStateToProps , mapDispatchToProps)(ProjectPage)

export {ConnectedFocusedPage}