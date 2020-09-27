import {connect} from 'react-redux'
import { ProjectPage } from './ProjectsPage'
import {getFilteredTasksByProject, getTasksAsArray , getProject} from '../../../redux/selectors/Selectors'


const mapStateToProps = (state , ownProps) => {
    const projectId = ownProps.match.params.projectId
    return {
        tasks: getFilteredTasksByProject( getTasksAsArray(state) , projectId),
        project: getProject(state , projectId)
    }
}

const mapDispatchToProps = (dispatch) => {
    return {

    }
}

const ConnectedProjectPage = connect(mapStateToProps , mapDispatchToProps)(ProjectPage)

export {ConnectedProjectPage}