import {connect} from 'react-redux'
import App from './App'
import { getUser } from './redux/selectors/Selectors'

const mapStateToProps = (state) => {
    return {
        user: getUser(state)
    }
}

const ConnectedApp = connect(mapStateToProps , null)(App)

export {ConnectedApp}