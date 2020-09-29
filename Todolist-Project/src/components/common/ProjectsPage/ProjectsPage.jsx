import React from "react";
import { ConnectedAddTaskForm } from "../../Tasks/AddTaskForm/ConnectedAddTaskForm";
import { TasksListItem } from "../TasksListItem/TasksListItem";

const ProjectPage = ({ tasks, project , editTask}) => {
	if (!project) {
		return <h1>...Loding...</h1>;
	}

	return (
		<div>
			<h1>{project.name}</h1>
			<div>
				{!tasks || tasks.length === 0 ? (
					<div>
						There is no tasks yet. Want to add one? <ConnectedAddTaskForm projectId={project.id} />
					</div>
				) : (
					<>
						<ul>
							{tasks.map((task) => (
								<li key={task.id}>
									<TasksListItem {...task} editTask={editTask}/>
								</li>
							))}
						</ul>
						<ConnectedAddTaskForm projectId={project.id} />
					</>
				)}
			</div>
		</div>
	);
};

export { ProjectPage };
