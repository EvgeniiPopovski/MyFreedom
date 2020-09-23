import {connect} from 'react-redux'
import { getProgectsThunk } from '../../redux/projectsReduser'
import { SideMenu } from './SideMenu'

const getProjects = (globalState) => globalState.projects

const mapStateToProps = (state) => {
    return {
        projects : getProjects(state)
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getProjects: () => dispatch(getProgectsThunk())
    }
}

const ConnectedSideMenu = connect(mapStateToProps ,mapDispatchToProps)(SideMenu)

export {ConnectedSideMenu}