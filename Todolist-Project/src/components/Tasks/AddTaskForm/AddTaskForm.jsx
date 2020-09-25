import React, { useState } from "react";

const AddTaskForm = ({ projects }) => {
	const [title, setTitle] = useState("");
	const [description, setDescription] = useState("");
	const [isFocusedOn, setIsFocusedOn] = useState(false);
	const [projectId, setProjectId] = useState(null);
	return (
		<div>
			<form onSubmit={(e) => e.preventDefault()}>
				<div>
					<label htmlFor="taskTitle">Task Name</label>
					<input
						name="taskTitle"
						type="text"
						value={title}
						onChange={(e) => setTitle(e.target.value)}
					/>
				</div>
				<div>
					<label htmlFor="taskDescription">Task Description</label>
					<input
						name="taskDescription"
						type="text"
						value={description}
						onChange={(e) => setDescription(e.target.value)}
					/>
				</div>
				<div>
					<label htmlFor="taskProject">Task Project</label>
					<select
						name="taskProject"
						onChange={(e) => setProjectId(e.target.value)}
					>
						<option value="">Choose a project</option>
						{projects &&
							projects.map((project) => (
								<option value={project.id}>{project.name}</option>
							))}
					</select>
				</div>
				<div>
					<label htmlFor="focusedOn">Focus on task? </label>
					<input
						name="focusedOn"
						type="checkbox"
						value={isFocusedOn}
						onChange={() => setIsFocusedOn(!isFocusedOn)}
					/>
				</div>

				<div>
					<button
						onClick={() =>
							console.log({
								title,
								description,
                                isFocusedOn,
                                projectId,
								createdOn: Date.now().toString(),
								isDone: false,
							})
						}
					>
						Save
					</button>
				</div>
			</form>
		</div>
	);
};

export { AddTaskForm };
