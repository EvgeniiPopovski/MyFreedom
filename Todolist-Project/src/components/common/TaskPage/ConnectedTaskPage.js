import {connect} from 'react-redux'
import { getTask } from '../../../redux/selectors/Selectors'
import { TaskPage } from './TaskPage'

const mapStateToProps = (state, ownProps) => {
    const taskId = ownProps.match.params.taskId
    return {
        task : getTask(state , taskId)
    }
}

const mapDispatchToProps = (dispatch) => {
    return {

    }
}

const ConnectedTaskPage = connect(mapStateToProps , mapDispatchToProps)(TaskPage)

export {ConnectedTaskPage}