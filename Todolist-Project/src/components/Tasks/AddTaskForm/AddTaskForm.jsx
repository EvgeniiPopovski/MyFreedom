import React, { useState } from "react";

const AddTaskForm = ({ projects, saveTask }) => {
	const [showForm, setShowForm] = useState(false);

	const [title, setTitle] = useState("");
	const [description, setDescription] = useState("");
	const [isFocusedOn, setIsFocusedOn] = useState(false);
	const [projectId, setProjectId] = useState(null);
	return !showForm ? (
		<button onClick={() => setShowForm(true)}> Add Task </button>
	) : (
		<>
			<button onClick={() => setShowForm(false)}>Cancel</button>
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
						<select name="taskProject" onChange={(e) => setProjectId(e.target.value)}>
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
							onClick={() => {
								saveTask({
									title,
									description,
									isFocusedOn,
									projectId,
									createdOn: Date.now().toString(),
									isDone: false,
								})
								setShowForm(false)
							}
							}
						>
							Save
						</button>
					</div>
				</form>
			</div>
		</>
	);
};

export { AddTaskForm };
