import { connect } from "react-redux";
import { addProjectThunk } from "../../../redux/projectsReduser";
import { getUserId } from "../../../redux/selectors/Selectors";
import { AddProjectsForm } from "./AddProjectsForm";

const mapStateToProps = (state) => {
	return {
		userId: getUserId(state),
	};
};
const mapDispatchToProps = (dispatch) => {
	return {
		addProject: (project) => dispatch(addProjectThunk(project)),
	};
};

const ConnectedAddProjectForm = connect(
	mapStateToProps,
	mapDispatchToProps
)(AddProjectsForm);

export { ConnectedAddProjectForm };
