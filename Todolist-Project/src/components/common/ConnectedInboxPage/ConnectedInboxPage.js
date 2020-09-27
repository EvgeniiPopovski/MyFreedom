import {connect} from 'react-redux'
import { getFilteredTasksByProject, getTasksAsArray } from '../../../redux/selectors/Selectors'
import { ProjectPage } from '../ProjectsPage/ProjectsPage'

const mapStateToProps = (state) => {
    return {
        tasks: getFilteredTasksByProject( getTasksAsArray(state) , null),
        project: {name: 'Inbox'}
    }
}

const mapDispatchToProps = (dispatch) => {
    return {

    }
}

const ConnectedInboxPage = connect (mapStateToProps , mapDispatchToProps)(ProjectPage)

export {ConnectedInboxPage}