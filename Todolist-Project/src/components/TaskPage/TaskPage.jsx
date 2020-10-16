import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { ConnectedEditTaskForm } from "../Tasks/EditTaskForm/ConnecteEditTaskForm";
import { Button } from "../common/Button/Button";
import { FadeComponent } from "../common/FadeComponent/FadeComponent";
import { Preloader } from "../common/Preloader/Preloader";

const TaskPage = ({ task, project, editTask, isLoading }) => {
	const [editMode, setEditMode] = useState(false);

	const history = useHistory();
	const projectId = history.location.state.projectId;

	if (isLoading) {
		return <Preloader />;
	}

	if (!task) {
		return (
			<>
				<Preloader />
				{setTimeout(() => {
					projectId !== "inbox"
						? history.replace(`/project/${projectId}`)
						: history.replace(`/inbox`);
				}, 1000)}
			</>
		);
	}

	return (
		<FadeComponent inProp={true} timeout={100} className={"main-container"}>
			{editMode ? (
				<ConnectedEditTaskForm task={task} setEditMode={setEditMode} />
			) : (
				<>
					<div>
						<h1>{task.title}</h1>
						<p>Task Description: {task.description}</p>
						{project && <p>To project: {project.name}</p>}
						<p>
							Is Focused:
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
							<Button kind="warning" onClick={() => setEditMode(true)}>
								Edit task
							</Button>
						</div>
					</div>
				</>
			)}
		</FadeComponent>
	);
};

export { TaskPage };
