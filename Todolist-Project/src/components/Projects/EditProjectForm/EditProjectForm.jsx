import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { firestoreAPI } from "../../../firebaseAPI/firebase";
import { Preloader } from "../../common/Preloader/Preloader";
import { Button } from "./../../common/Button/Button";
import "./../ProgectsForm.scss";

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
		return <Preloader />;
	}

	if (showDeleteForm) {
		return (
			<>
				<div className="main-container">
					<h2>
						Do you realy want to DELETE Project: <i>{project.name}</i> ?
					</h2>
					<p>
						To confirm action please type <b>'Delete'</b> in the following
						field
					</p>
					<input
						className="input-block__input"
						type="text"
						value={confirmValue}
						onChange={(e) => setConfirmValue(e.target.value)}
					/>
					<div>
						<Button
							kind="danger"
							disabled={confirmValue !== "Delete"}
							onClick={() => {
								deleteProject(project.id);
								firestoreAPI.killProject("tasks", project.id);
								history.push("/inbox");
							}}
						>
							Delete
						</Button>
						<Button
							kind="warning"
							onClick={() => {
								setshowDeleteForm(false);
							}}
						>
							Cancel
						</Button>
					</div>
				</div>
			</>
		);
	}
	return (
		<div className="main-container">
			<form onSubmit={(e) => e.preventDefault()}>
				<h1>Edit Project: {project.name}</h1>
				<div className="input-block">
					<label htmlFor="projectName"> New Project Name</label>
					<input
						className="input-block__input"
						name="projectName"
						type="text"
						value={name}
						onChange={(e) => setName(e.target.value)}
					/>
				</div>
				<div className="input-block">
					<label htmlFor="projectDescription"> New Project description</label>
					<input
						className="input-block__input"
						name="projectDescription"
						type="text"
						value={description}
						onChange={(e) => setDescription(e.target.value)}
					/>
				</div>
				<Button
					kind="submit"
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
				</Button>
				<Button kind="danger" onClick={() => setshowDeleteForm(true)}>
					Delete
				</Button>
			</form>
		</div>
	);
};

export { EditProjectForm };
