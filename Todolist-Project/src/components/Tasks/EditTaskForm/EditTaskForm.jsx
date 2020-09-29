import React, { useState } from "react";

const EditTaskForm = ({ projects, task, editTask, deleteTask , showForm }) => {
	const [title, setTitle] = useState(task.title);
	const [description, setDescription] = useState(task.description);
	const [isFocusedOn, setIsFocusedOn] = useState(task.isFocusedOn);
	const [projectId, setProjectId] = useState(task.projectId);
	const [isDone , setIsDone] = useState(task.isDone)

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
						defaultValue={projectId }
					>
						<option value=''>Inbox</option>
						{projects &&
							projects.map((project) => (
								<option key={project.id} value={project.id} > 
									{project.name}
								</option>
							))}
					</select>
				</div>
				<div>
					<label htmlFor="focusedOn">Focus on task? </label>
					<input
						name="focusedOn"
						type="checkbox"
						checked={isFocusedOn}
						value={isFocusedOn}
						onChange={() => setIsFocusedOn(!isFocusedOn)}
					/>
				</div>
				<div>
					<label htmlFor="isDone">Is it Done ?</label>
					<input
						name="isDone"
						type="checkbox"
						checked={isDone}
						value={isDone}
						onChange={() => setIsDone(!isDone)}
					/>
				</div>

				<div>
					<button
						onClick={() => {
							editTask({
								id: task.id,
								title,
								description,
								isFocusedOn,
								projectId,
								createdOn: task.createdOn,
								isDone,
							});
							showForm(false)
						}}
					>
						Save
					</button>
					<button onClick={() => deleteTask(task.id)}>Delete</button>
				</div>
			</form>
		</div>
	);
};

export { EditTaskForm };
