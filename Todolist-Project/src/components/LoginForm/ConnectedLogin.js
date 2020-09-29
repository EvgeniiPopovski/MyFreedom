import {connect} from 'react-redux'
import { loginThunk } from '../../redux/userReduser'
import { LoginForm } from './LoginForm'

const mapStateToProps = (state) => {
    return {

    }
}

const mapDispatchToPrps = (dispatch) => {
    return {
        login: (email , password) => dispatch(loginThunk(email , password))
    }
}

const ConnectedLoginForm = connect(mapStateToProps , mapDispatchToPrps)(LoginForm)

export {ConnectedLoginForm}