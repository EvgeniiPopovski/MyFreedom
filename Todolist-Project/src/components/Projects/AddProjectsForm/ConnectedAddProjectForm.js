import { connect } from "react-redux";
import { addProjectThunk } from "../../../redux/projectsReduser";
import { AddProjectsForm } from "./AddProjectsForm";

const mapDispatchToProps = (dispatch) => {
	return {
		addProject: (project) => dispatch(addProjectThunk(project)),
	};
};

const ConnectedAddProjectForm = connect(null, mapDispatchToProps)(AddProjectsForm);

export { ConnectedAddProjectForm };
