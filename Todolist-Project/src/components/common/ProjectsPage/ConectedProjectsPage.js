import { connect } from "react-redux";
import { ProjectPage } from "./ProjectsPage";
import {
	getFilteredTasksByProject,
	getProject,
	sortTasksByIsDone,
} from "../../../redux/selectors/Selectors";
import { editTaskThunk } from "../../../redux/tasksReduser";

const mapStateToProps = (state, ownProps) => {
	const projectId = ownProps.match.params.projectId;
	return {
		tasks: getFilteredTasksByProject(sortTasksByIsDone(state), projectId),
		project: getProject(state, projectId),
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		editTask: (task) => dispatch(editTaskThunk(task)),
	};
};

const ConnectedProjectPage = connect(mapStateToProps, mapDispatchToProps)(ProjectPage);

export { ConnectedProjectPage };
