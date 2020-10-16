import {connect} from 'react-redux'
import App from './App'
import { getProjectsError } from './components/ProjectsPage/projectsSelectors'
import { getTasksError } from './components/TaskPage/tasksSelectors'
import { getIsLoadingUser, getUser } from './components/Header/userSelector'

const mapStateToProps = (state) => {
    return {
        user: getUser(state),
        isLoading: getIsLoadingUser(state),
        errors : {
            project: getProjectsError(state),
            task: getTasksError(state),
        }
    }
}

const ConnectedApp = connect(mapStateToProps , null)(App)

export {ConnectedApp}