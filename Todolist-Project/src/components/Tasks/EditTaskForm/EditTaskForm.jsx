import React, { useState } from "react";
import { Button } from "../../common/Button/Button";
import "./../TaskForm.scss";

const EditTaskForm = ({ projects, task, editTask, deleteTask, showForm }) => {
	const [title, setTitle] = useState(task.title);
	const [description, setDescription] = useState(task.description);
	const [isFocusedOn, setIsFocusedOn] = useState(task.isFocusedOn);
	const [projectId, setProjectId] = useState(task.projectId);
	const [date, setDate] = useState(task.date);
	const [isDone, setIsDone] = useState(task.isDone);

	return (
		<div className="task-form wrapper">
			<form className="task-form" onSubmit={(e) => e.preventDefault()}>
				<h1>Task: {task.title}</h1>
				<div className="input-block">
					<label className="input-block__title" htmlFor="taskTitle">
						Task Name
					</label>
					<input
						className="input-block__input"
						name="taskTitle"
						type="text"
						value={title}
						onChange={(e) => setTitle(e.target.value)}
					/>
				</div>
				<div className="input-block">
					<label className="input-block__title" htmlFor="taskDescription">
						Task Description
					</label>
					<input
						className="input-block__input"
						name="taskDescription"
						type="text"
						value={description}
						onChange={(e) => setDescription(e.target.value)}
					/>
				</div>

				<div className="input-block">
					<label className="input-block__title" htmlFor="taskDescription">
						Task date
					</label>
					<input
						className="input-block__input"
						name="taskDescription"
						type="date"
						value={date}
						onChange={(e) => setDate(e.target.value)}
					/>
				</div>

				<div className="input-block">
					<label className="input-block__title" htmlFor="taskProject">
						Task Project
					</label>
					<select
						className="input-block__input"
						name="taskProject"
						onChange={(e) => setProjectId(e.target.value)}
						defaultValue={projectId}
					>
						<option value="inbox">Inbox</option>
						{projects &&
							projects.map((project) => (
								<option key={project.id} value={project.id}>
									{project.name}
								</option>
							))}
					</select>
				</div>
				<div className="input-block">
					<label className="input-block__title" htmlFor="focusedOn">
						Focus on task?{" "}
					</label>
					<input
						className="input-block__input"
						name="focusedOn"
						type="checkbox"
						checked={isFocusedOn}
						value={isFocusedOn}
						onChange={() => setIsFocusedOn(!isFocusedOn)}
					/>
				</div>
				<div className="input-block">
					<label className="input-block__title" htmlFor="isDone">
						Is it Done ?
					</label>
					<input
						className="input-block__input"
						name="isDone"
						type="checkbox"
						checked={isDone}
						value={isDone}
						onChange={() => setIsDone(!isDone)}
					/>
				</div>

				<div>
					<Button
						kind="submit"
						onClick={() => {
							editTask({
								id: task.id,
								title,
								description,
								isFocusedOn,
								projectId,
								createdOn: task.createdOn,
								isDone,
								userId: task.userId,
								date
							});
							showForm(false);
						}}
					>
						Save
					</Button>
					<Button kind="warning" onClick={() => showForm(false)}>
						Cancel
					</Button>
					<Button kind="danger" onClick={() => deleteTask(task.id)}>
						Delete
					</Button>
					
				</div>
			</form>
		</div>
	);
};

export { EditTaskForm };
