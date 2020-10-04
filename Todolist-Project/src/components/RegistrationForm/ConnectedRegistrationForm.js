import {connect} from 'react-redux'
import { getUser, getUserError } from '../../redux/selectors/Selectors'
import { registerThunk, signInWithGoogleThunk } from '../../redux/userReduser'
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
    }
}

const ConnectedRegistrationForm = connect(mapStateToProps , mapDispatchToProps)(RegistrationForm)

export {ConnectedRegistrationForm}

