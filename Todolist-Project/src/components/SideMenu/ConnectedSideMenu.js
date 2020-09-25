import {connect} from 'react-redux'
import { getProjectsAsArray } from '../../redux/selectors/Selectors'
import { getProgectsThunk } from '../../redux/projectsReduser'
import { SideMenu } from './SideMenu'


const mapStateToProps = (state) => {
    return {
        projects : getProjectsAsArray(state)
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getProjects: () => dispatch(getProgectsThunk())
    }
}

const ConnectedSideMenu = connect(mapStateToProps ,mapDispatchToProps)(SideMenu)

export {ConnectedSideMenu}