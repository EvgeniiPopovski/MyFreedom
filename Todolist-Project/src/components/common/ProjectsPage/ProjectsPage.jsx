import React from "react";
import { Link } from "react-router-dom";
import { ConnectedAddTaskForm } from "../../Tasks/AddTaskForm/ConnectedAddTaskForm";

const ProjectPage = ({ tasks, project }) => {
	if (!project) {
		return <h1>...Loding...</h1>;
	}

	return (
		<div>
			<h1>{project.name}</h1>
			<div>
				{!tasks || tasks.length === 0 ? (
					<div>
						There is no tasks yet. Want to add one? <ConnectedAddTaskForm />
					</div>
				) : (
					<>
						<ul>
							{tasks.map((task) => (
								<li key={task.id}>
									<p className="tasks__item">
										<Link to={`/task/info/${task.id}`}>Title {task.title}</Link>
										<p>{task.createdOn}</p>
										<p>
											Focused?
											<input
												type="checkbox"
												checked={task.isFocusedOn}
												value={task.isFocusedOn}
											/>
										</p>
										<p>
											Is done?
											<input type="checkbox" checked={task.isDone} value={task.isDone} />
										</p>
									</p>
								</li>
							))}
						</ul>
						<ConnectedAddTaskForm />
					</>
				)}
			</div>
		</div>
	);
};

export { ProjectPage };
