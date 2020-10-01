import {connect} from 'react-redux'
import { getUser } from '../../redux/selectors/Selectors'
import { loadUserThunk, logoutThunk } from '../../redux/userReduser'
import { Header } from './Header'



const mapStateToProps = (state) => {
    return { 
        user: getUser(state)
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        logout: () => dispatch(logoutThunk()),
        loadUser: () => dispatch(loadUserThunk())
    }
}

const ConnectedHeader = connect (mapStateToProps , mapDispatchToProps)(Header)

export {ConnectedHeader}