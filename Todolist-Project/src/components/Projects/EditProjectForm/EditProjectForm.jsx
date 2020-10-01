import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { firestoreAPI } from "../../../firebaseAPI/firebase";

const EditProjectForm = ({ project, editProject, deleteProject }) => {
	const [name, setName] = useState("");
	const [description, setDescription] = useState("");
	const [showDeleteForm, setshowDeleteForm] = useState(false);
	const [confirmValue, setConfirmValue] = useState("");

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

	if (showDeleteForm) {
		return (
			<>
				<div>
					<h3>
						Do you realy want to delete Project: <i>{project.name}</i> ?
					</h3>
					<p>
						To confirm action please type <b>'Delete'</b> in the following
						field
					</p>
					<input
						type="text"
						value={confirmValue}
						onChange={(e) => setConfirmValue(e.target.value)}
					/>
					<button
						disabled={confirmValue !== "Delete"}
						onClick={() => {
							deleteProject(project.id);
							firestoreAPI.killProject("tasks", project.id);
							history.push("/inbox");
						}}
					>
						Delete
					</button>
					<button
						onClick={() => {
							setshowDeleteForm(false);
						}}
					>
						Cancel
					</button>
				</div>
			</>
		);
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
					disabled={!name}
					onClick={() => {
						editProject({
							id: project.id,
							name,
							description,
							userId: project.userId,
						});
						history.push("/inbox");
					}}
				>
					Save
				</button>
				<button
					onClick={() => setshowDeleteForm(true)}
					// onClick={() => {
					// 	deleteProject(project.id);
					// 	firestoreAPI.killProject("tasks", project.id);
					// 	history.push("/inbox");
					// }}
				>
					Delete
				</button>
			</form>
		</div>
	);
};

export { EditProjectForm };
