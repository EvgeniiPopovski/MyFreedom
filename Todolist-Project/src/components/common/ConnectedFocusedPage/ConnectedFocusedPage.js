import {connect} from 'react-redux'
import { getFilteredTasksByFocusedOn, getTasksAsArray } from '../../../redux/selectors/Selectors'
import { ProjectPage } from '../ProjectsPage/ProjectsPage'

const mapStateToProps = (state) => {
    return {
        tasks: getFilteredTasksByFocusedOn( getTasksAsArray(state)),
        project: {name: 'Focused on'}
    }
}

const mapDispatchToProps = (dispatch) => {
    return {

    }
}

const ConnectedFocusedPage = connect (mapStateToProps , mapDispatchToProps)(ProjectPage)

export {ConnectedFocusedPage}