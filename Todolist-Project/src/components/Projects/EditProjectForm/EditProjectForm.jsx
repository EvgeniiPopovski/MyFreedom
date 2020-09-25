import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

const EditProjectForm = ({ project, editProject, deleteProject }) => {
	const [name, setName] = useState("");
	const [description, setDescription] = useState("");

	const history = useHistory();

	useEffect(() => {
		if (project) {
			setName(project.name);
			setDescription(project.description);
		}
	}, [project]);

	if (!project) {
		return <h1> ...loading... </h1>;
	}

	return (
		<div>
			<form onSubmit={(e) => e.preventDefault()}>
				<h3>Edit Project</h3>
				<div>
					<label htmlFor="projectName"> New Project Name</label>
					<input
						name="projectName"
						type="text"
						value={name}
						onChange={(e) => setName(e.target.value)}
					/>
				</div>
				<div>
					<label htmlFor="projectDescription"> New Project description</label>
					<input
						name="projectDescription"
						type="text"
						value={description}
						onChange={(e) => setDescription(e.target.value)}
					/>
				</div>
				<button
					onClick={() => {
                        editProject({ id: project.id, name, description });
                        history.push("/inbox")
					}}
				>
					Save
				</button>
				<button
					disabled={!name}
					onClick={() => {
                        deleteProject(project.id);
                        history.push("/inbox")
					}}
				>
					Delete
				</button>
			</form>
		</div>
	);
};

export { EditProjectForm };
