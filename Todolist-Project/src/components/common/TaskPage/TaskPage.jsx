import React, { useState } from "react";
import { EditTaskForm } from "../../Tasks/EditTaskForm/EditTaskForm";

const TaskPage = ({ task }) => {
	const [editMode, setEditMode] = useState(false);
	return (
		<>
			{editMode ? (
				<EditTaskForm task={task} />
			) : (
				<>
					<div>
						<h1>Task Name : {task.title}</h1>
						<p>Task Description : {task.description}</p>
						<p>
							Is Focused :
							<input
								type="checkbox"
								value={task.isFocusedIn}
								checked={task.isFocusedIn}
							/>
						</p>
						<p>
							Is Done :
							<input type="checkbox" value={task.isDone} checked={task.isDone} />
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
