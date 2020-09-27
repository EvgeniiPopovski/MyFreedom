import React, { useState } from "react";

const EditTaskForm = ({ projects , task, editTask , deleteTask }) => {

	const [title, setTitle] = useState(task.title);
	const [description, setDescription] = useState(task.dscription);
	const [isFocusedOn, setIsFocusedOn] = useState(task.isFocusedOn);
	const [projectId, setProjectId] = useState(task.projectId);
	
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
						<select name="taskProject" onChange={(e) => setProjectId(e.target.value)}>
							<option value="">Choose a project</option>
							{projects &&
								projects.map((project) => (
									<option key={project.id} value={project.id}>{project.name}</option>
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
								editTask({
									title,
									description,
									isFocusedOn,
									projectId,
									createdOn: task.createdOn,
									isDone: false,
								})
							}}
						>
							Save
						</button>
						<button onClick={() => deleteTask(task.id)}>Delete</button>
					</div>
				</form>
			</div>
	)
};

export { EditTaskForm };
