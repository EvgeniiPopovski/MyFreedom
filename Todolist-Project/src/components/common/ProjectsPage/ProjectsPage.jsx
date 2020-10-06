import React from "react";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { ConnectedAddTaskForm } from "../../Tasks/AddTaskForm/ConnectedAddTaskForm";
import { FadeComponent } from "../FadeComponent/FadeComponent";
import { TasksListItem } from "../TasksListItem/TasksListItem";
import { Preloader } from "./../../common/Preloader/Preloader";
import "./ProjectPage.scss";

const ProjectPage = ({ tasks, project, editTask, isLoading }) => {
	return (
		<FadeComponent inProp={true} timeout={100} className={"main-container"}>
			<h1 className="projectPage__title">{project.name}</h1>
			<p className="project__item-description">{project.description}</p>
			<div>
				{!tasks || tasks.length === 0 ? (
					<div>
						<p>There is no tasks yet. Want to add one? </p>
						<ConnectedAddTaskForm projectId={project.id} />
					</div>
				) : (
					<>
						<TransitionGroup>
							<ul className="tasks-list">
								{isLoading && <Preloader />}
								{tasks.map((task) => (
									<li key={task.id}>
										<CSSTransition timeout={100} classNames='tasks__item'>
											<TasksListItem
												{...task}
												editTask={editTask}
											/>
										</CSSTransition>
									</li>
								))}
							</ul>
						</TransitionGroup>
						<ConnectedAddTaskForm projectId={project.id} />
					</>
				)}
			</div>
		</FadeComponent>
	);
};

export { ProjectPage };
