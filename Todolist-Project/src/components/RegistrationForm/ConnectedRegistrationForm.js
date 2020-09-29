import {connect} from 'react-redux'
import { registerThunk } from '../../redux/userReduser'
import {RegistrationForm} from '../RegistrationForm/RegistrationForm'

const mapStateToProps = (state) => {
    return {

    }
}

const mapDispatchToProps =(dispatch) => {
    return {
        register: (email , password) => dispatch(registerThunk(email , password))
    }
}

const ConnectedRegistrationForm = connect(mapStateToProps , mapDispatchToProps)(RegistrationForm)

export {ConnectedRegistrationForm}

