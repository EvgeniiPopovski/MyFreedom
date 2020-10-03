import {connect} from 'react-redux'
import App from './App'
import { getIsLoadingUser, getUser } from './redux/selectors/Selectors'

const mapStateToProps = (state) => {
    return {
        user: getUser(state),
        isLoading: getIsLoadingUser(state)
    }
}

const ConnectedApp = connect(mapStateToProps , null)(App)

export {ConnectedApp}