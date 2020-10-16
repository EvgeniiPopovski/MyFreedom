import { connect } from "react-redux";
import { deleteProjectThunk, editProjectThunk } from "../../../redux/projectsReduser";
import { getProjectsAsArray } from "./../../ProjectsPage/projectsSelectors";

import { EditProjectForm } from "./EditProjectForm";

const findProject = (projectsArr, projectId) => {
	const project = projectsArr.find((item) => item.id === projectId);
	return project;
};

const mapStateToProps = (state, ownProps) => {
	const projectId = ownProps.match.params.projectId;
	return {
		projectId,
		project: findProject(getProjectsAsArray(state), projectId),
	};
};

const mapDispatchToProps = (dispatch) => {
	return {
		editProject: (project) => dispatch(editProjectThunk(project)),
		deleteProject: (projectId) => dispatch(deleteProjectThunk(projectId)),
	};
};

const ConenctedEditProjectForm = connect(
	mapStateToProps,
	mapDispatchToProps
)(EditProjectForm);

export { ConenctedEditProjectForm };
