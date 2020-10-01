import React, { useState } from "react";
import { useHistory } from "react-router-dom";

const AddProjectsForm = ({ addProject , userId }) => {
	const [name, setName] = useState("");
	const [description, setDescription] = useState("");
	const history = useHistory();
	return (
		<div>
			<h3>Add Project</h3>
			<form onSubmit={(e) => e.preventDefault()}>
				<div>
					<label htmlFor="projectName">Project name</label>
					<input
						name="projectName"
						type="text"
						value={name}
						onChange={(e) => setName(e.target.value)}
					/>
				</div>
				<div>
					<label htmlFor="progectDescription">Project descripion</label>
					<input
						name="projectDescription"
						type="text"
						value={description}
						onChange={(e) => setDescription(e.target.value)}
					/>
				</div>
				<button
					disabled={!name}
					onClick={async () => {
                        await addProject({name , description , userId})
						history.push("/inbox");
					}}
				>
					Save
				</button>
			</form>
		</div>
	);
};

export { AddProjectsForm };
