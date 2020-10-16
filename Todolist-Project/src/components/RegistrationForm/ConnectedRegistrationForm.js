import {connect} from 'react-redux'
import { getUser, getUserError } from '../Header/userSelector'
import { registerThunk, signInWithGoogleThunk, userErrorRegisterAC } from '../../redux/userReduser'
import {RegistrationForm} from '../RegistrationForm/RegistrationForm'

const mapStateToProps = (state) => {
    return {
        user: getUser(state),
        userError: getUserError(state)
    }
}

const mapDispatchToProps =(dispatch) => {
    return {
        register: (email , password) => dispatch(registerThunk(email , password)),
        signInWithGoogle: () => dispatch(signInWithGoogleThunk()),
        resetRegisterError: () => dispatch(userErrorRegisterAC(null))
    }
}

const ConnectedRegistrationForm = connect(mapStateToProps , mapDispatchToProps)(RegistrationForm)

export {ConnectedRegistrationForm}

