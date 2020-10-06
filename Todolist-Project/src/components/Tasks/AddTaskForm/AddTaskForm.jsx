import React, { useState } from "react";
import { Button } from "../../common/Button/Button";
import { ErrorMessage } from "../../common/ErrorMessage/ErrorMessage";
import "./../TaskForm.scss";

const AddTaskForm = ({
	projects,
	saveTask,
	selectedProjectId = "inbox",
	userId,
	taskError,
}) => {
	const [showForm, setShowForm] = useState(false);

	const [title, setTitle] = useState("");
	const [description, setDescription] = useState("");
	const [isFocusedOn, setIsFocusedOn] = useState(false);
	const [projectId, setProjectId] = useState(selectedProjectId);
	const [date , setDate] =useState('') 

	return !showForm ? (
		<Button kind="submit" onClick={() => setShowForm(true)}>
			Add Task
		</Button>
	) : (
		<>
			<Button kind="danger" onClick={() => setShowForm(false)}>
				Cancel
			</Button>
			<div className="task-form wrapper">
				{taskError && <ErrorMessage errorTxt={taskError} />}
				<form className="task-form" onSubmit={(e) => e.preventDefault()}>
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
							Date
						</label>
						<input
							className="input-block__input"
							name="taskDate"
							type="date"
							value={date}
							onChange={(e) => {
								console.log(e.target.value)
								setDate(e.target.value)}
							}
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
							<option value="Inbox">Inbox</option>
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
							Focus on task?
						</label>
						<input
							className="input-block__input"
							name="focusedOn"
							type="checkbox"
							value={isFocusedOn}
							checked={isFocusedOn}
							onChange={() => setIsFocusedOn(!isFocusedOn)}
						/>
					</div>

					<div>
						<Button
							kind="submit"
							disabled={!title}
							onClick={() => {
								saveTask({
									title,
									description,
									isFocusedOn,
									projectId,
									createdOn: Date.now().toString(),
									isDone: false,
									userId,
									date
								});
								setShowForm(false);
							}}
						>
							Save
						</Button>
					</div>
				</form>
			</div>
		</>
	);
};

export { AddTaskForm };
