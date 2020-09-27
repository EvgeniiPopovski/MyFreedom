import {connect} from 'react-redux'
import { getProjectsAsArray } from '../../redux/selectors/Selectors'
import { getProgectsThunk } from '../../redux/projectsReduser'
import { SideMenu } from './SideMenu'
import { getTasksThunk } from '../../redux/tasksReduser'


const mapStateToProps = (state) => {
    return {
        projects : getProjectsAsArray(state)
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getProjects: () => dispatch(getProgectsThunk()),
        getTasks: () => dispatch(getTasksThunk())
    }
}

const ConnectedSideMenu = connect(mapStateToProps ,mapDispatchToProps)(SideMenu)

export {ConnectedSideMenu}