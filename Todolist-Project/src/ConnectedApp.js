import {connect} from 'react-redux'
import App from './App'
import { getIsLoadingUser, getProjectsError, getTasksError, getUser } from './redux/selectors/Selectors'

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