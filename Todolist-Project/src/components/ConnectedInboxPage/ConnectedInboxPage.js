import { connect } from "react-redux";
import {
	getActualTasks,
	getExpriredTasks,
	getIsLoadingPTasks,
} from "./../TaskPage/tasksSelectors";
import { editTaskOnDragThunk, editTaskThunk } from "../../redux/tasksReduser";
import { ProjectPage } from "../ProjectsPage/ProjectsPage";

const date = (new Date()).toISOString().split('T')[0];

const mapStateToProps = (state) => {
	return {
		tasks:  getActualTasks(state, date, 'inbox'),
		project: { name: "Inbox" },
		isLoading: getIsLoadingPTasks(state),
		expiredTasks: getExpriredTasks(state, date, 'inbox')
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		editTask: (task) => dispatch(editTaskThunk(task)),
		onDragEndThunk: (taskId) => dispatch(editTaskOnDragThunk(taskId)),
	};
};

const ConnectedInboxPage = connect(mapStateToProps, mapDispatchToProps)(ProjectPage);

export { ConnectedInboxPage };
