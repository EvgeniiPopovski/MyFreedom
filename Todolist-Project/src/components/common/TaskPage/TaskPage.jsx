import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { ConnectedEditTaskForm } from "../../Tasks/EditTaskForm/ConnecteEditTaskForm";

const TaskPage = ({ task, project, editTask  }) => {
	const [editMode, setEditMode] = useState(false);

	const history = useHistory();
	const projectId = history.location.state.projectId;

	if (!task) {
		return (
			<>
				<div>
					Task was succesfully deleted. You will be redirected to your project
					in few seconsds
				</div>
				{setTimeout(() => {
					projectId
						? history.replace(`/project/${projectId}`)
						: history.replace(`/inbox`);
				}, 2000)}
			</>
		);
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
										isDone: task.isDone,
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
										isFocusedOn: task.isFocusedOn,
										isDone: !task.isDone,
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
