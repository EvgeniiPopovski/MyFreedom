import { connect } from "react-redux";
import { ProjectPage } from "./ProjectsPage";
import {
	getProject,
} from "./projectsSelectors";
import { getIsLoadingPTasks, getExpriredTasks, getActualTasks} from './../TaskPage/tasksSelectors'
import { editTaskOnDragThunk, editTaskThunk } from "../../redux/tasksReduser";

const date = (new Date()).toISOString().split('T')[0];

const mapStateToProps = (state, ownProps) => {
	const projectId = ownProps.match.params.projectId;
	return {
		tasks:  getActualTasks(state, date, projectId),
		project: getProject(state, projectId),
		isLoading: getIsLoadingPTasks(state),
		expiredTasks: getExpriredTasks(state, date, projectId)
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		editTask: (task) => dispatch(editTaskThunk(task)),
		onDragEndThunk: (taskId) => dispatch(editTaskOnDragThunk(taskId)),
	};
};

const ConnectedProjectPage = connect(mapStateToProps, mapDispatchToProps)(ProjectPage);

export { ConnectedProjectPage };


