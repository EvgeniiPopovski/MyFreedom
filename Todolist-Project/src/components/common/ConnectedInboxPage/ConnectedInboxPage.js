import { connect } from "react-redux";
import {
	getFilteredTasksByProject,
	sortTasksByIsDone,
} from "../../../redux/selectors/Selectors";
import { editTaskThunk } from "../../../redux/tasksReduser";
import { ProjectPage } from "../ProjectsPage/ProjectsPage";

const mapStateToProps = (state) => {
	return {
		tasks: getFilteredTasksByProject( sortTasksByIsDone(state), "" || null),
		project: { name: "Inbox" },
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		editTask: (task) => dispatch(editTaskThunk(task)),
	};
};

const ConnectedInboxPage = connect(mapStateToProps, mapDispatchToProps)(ProjectPage);

export { ConnectedInboxPage };
