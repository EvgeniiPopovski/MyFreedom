import React, { useState } from "react";
import { ConnectedEditTaskForm } from "../../Tasks/EditTaskForm/ConnecteEditTaskForm";

const TaskPage = ({ task, project, editTask }) => {
	const [editMode, setEditMode] = useState(false);

	// const [isFocusedOn, setIsFocusedOn] = useState(false);
	// const [isDone, setIsDone] = useState(false);

	// useEffect(() => {
	// 	if (task) {
	// 		setIsFocusedOn(task.isFocusedOn);
	// 		setIsDone(task.isDone);
	// 	}
	// }, [task]);

	if (!task) {
		return <div>Seems Like task was deleted</div>;
	}

	return (
		<>
			{editMode ? (
				<ConnectedEditTaskForm task={task} setEditMode={setEditMode} />
			) : (
				<>
					<div>
						<h1>Task Name : {task.title}</h1>
						<p>Task Description : {task.description}</p>
						{project && <p>To project : {project.name}</p>}
						<p>
							Is Focused :
							<input
								type="checkbox"
								value={task.isFocusedOn}
								checked={task.isFocusedOn}
								onChange={() => {
									editTask({
										title: task.title,
										projectId: task.projectId,
										isFocusedOn: !task.isFocusedOn,
										isDone : task.isDone,
										id: task.id,
										description: task.description,
										createdOn: task.createdOn,
									});
								}}
							/>
						</p>
						<p>
							Is Done :
							<input
								type="checkbox"
								value={task.isDone}
								checked={task.isDone}
								onChange={() => {
									editTask({
										title: task.title,
										projectId: task.projectId,
										isFocusedOn : task.isFocusedOn,
										isDone : !task.isDone,
										id: task.id,
										description: task.description,
										createdOn: task.createdOn,
									});
								}}
							/>
						</p>
						<div>
							<button onClick={() => setEditMode(true)}>Edit task</button>
						</div>
					</div>
				</>
			)}
		</>
	);
};

export { TaskPage };
