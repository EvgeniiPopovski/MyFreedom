import {connect} from 'react-redux'
import {  getUser } from '../../redux/selectors/Selectors'
import { loadUserThunk, logoutThunk } from '../../redux/userReduser'
import { Header } from './Header'



const mapStateToProps = (state , ownProps) => {
    return { 
        user: getUser(state),
        sideMenu: ownProps.sideMenu,
        showMenu: ownProps.showMenu,
    }
}

const mapDispatchToProps = (dispatch , ownProps) => {
    return {
        openMenu: (bool) => ownProps.setShowMenu(bool),
        logout: () => dispatch(logoutThunk()),
        loadUser: () => dispatch(loadUserThunk())
    }
}

const ConnectedHeader = connect (mapStateToProps , mapDispatchToProps)(Header)

export {ConnectedHeader}