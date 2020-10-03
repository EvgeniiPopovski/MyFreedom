import React from "react";
import { ConnectedAddTaskForm } from "../../Tasks/AddTaskForm/ConnectedAddTaskForm";
import { TasksListItem } from "../TasksListItem/TasksListItem";
import { Preloader } from "./../../common/Preloader/Preloader";

const ProjectPage = ({ tasks, project, editTask, isLoading }) => {
	return (
		<div>
			<h1>{project.name}</h1>
			<div>
				{!tasks || tasks.length === 0 ? (
					<div>
						There is no tasks yet. Want to add one?{" "}
						<ConnectedAddTaskForm projectId={project.id} />
					</div>
				) : (
					<>
						<ul>
							{isLoading && <Preloader />}
							{tasks.map((task) => (
								<li key={task.id}>
									<TasksListItem {...task} editTask={editTask} />
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
