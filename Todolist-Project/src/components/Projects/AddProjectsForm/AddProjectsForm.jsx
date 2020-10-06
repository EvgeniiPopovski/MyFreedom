import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { Button } from "../../common/Button/Button";
import "./../ProgectsForm.scss";

const AddProjectsForm = ({ addProject, userId }) => {
	const [name, setName] = useState("");
	const [description, setDescription] = useState("");
	const history = useHistory();
	return (
		<div className="main-container">
			<h1>Add Project</h1>
			<form onSubmit={(e) => e.preventDefault()}>
				<div className="input-block">
					<label htmlFor="projectName">Project name</label>
					<input
						className="input-block__input"
						name="projectName"
						type="text"
						value={name}
						onChange={(e) => setName(e.target.value)}
					/>
				</div>
				<div className="input-block">
					<label htmlFor="progectDescription">Project descripion</label>
					<input
						className="input-block__input"
						name="projectDescription"
						type="text"
						value={description}
						onChange={(e) => setDescription(e.target.value)}
					/>
				</div>
				<Button
					disabled={!name}
					onClick={async () => {
						await addProject({ name, description, userId });
						history.push("/inbox");
					}}
				>
					Save
				</Button>
			</form>
		</div>
	);
};

export { AddProjectsForm };
