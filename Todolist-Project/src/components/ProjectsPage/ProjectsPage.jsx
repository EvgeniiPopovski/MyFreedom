import React from "react";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import { ConnectedAddTaskForm } from "../Tasks/AddTaskForm/ConnectedAddTaskForm";

import { Preloader } from "../common/Preloader/Preloader";
import "./ProjectPage.scss";
import { TasksListItem } from "../TasksListItem/TasksListItem";
import { FadeComponent } from "../common/FadeComponent/FadeComponent";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";

const ProjectPage = ({
	tasks,
	expiredTasks,
	project,
	editTask,
	isLoading,
	onDragEndThunk,
}) => {
	const onDragEnd = (result) => {
		const { source, destination } = result;
		if (!destination) {
			return;
		}
		if (source.droppableId === "expired" && destination.droppableId === "actual") {
			onDragEndThunk(result.draggableId);
		}
	};

	return (
		<DragDropContext onDragEnd={onDragEnd}>
			<FadeComponent inProp={true} timeout={100} className={"main-container"}>
				<h1 className="projectPage__title">{project.name}</h1>
				<p className="project__item-description">{project.description}</p>
				<div>
					{(!tasks || tasks.length === 0) &&
					(!expiredTasks || expiredTasks.length === 0) ? (
						<div>
							<p>There is no tasks yet. Want to add one? </p>
							<ConnectedAddTaskForm projectId={project.id} />
						</div>
					) : (
						<>
							<TransitionGroup>
								{expiredTasks && (
									<>
										<h1>Expired tasks</h1>
										<Droppable droppableId={"expired"}>
											{(provided, snapshot) => (
												<ul
													className="tasks-list"
													ref={provided.innerRef}
													{...provided.droppableProps}
												>
													{expiredTasks.map((task, index) => (
														<Draggable
															key={task.id}
															draggableId={task.id}
															index={index}
														>
															{(provided, snapshot) => (
																<li
																	ref={
																		provided.innerRef
																	}
																	{...provided.draggableProps}
																	{...provided.dragHandleProps}
																>
																	<CSSTransition
																		timeout={100}
																		classNames="tasks__item"
																	>
																		<TasksListItem
																			{...task}
																			editTask={
																				editTask
																			}
																		/>
																	</CSSTransition>
																</li>
															)}
														</Draggable>
													))}
													{provided.placeholder}
												</ul>
											)}
										</Droppable>
									</>
								)}
								<h1>Actual tasks</h1>
								<Droppable droppableId={"actual"}>
									{(provided, snapshot) => (
										<ul
											className="tasks-list"
											ref={provided.innerRef}
											{...provided.droppableProps}
										>
											{isLoading && <Preloader />}
											{tasks.map((task, index) => (
												<Draggable
													key={task.id}
													draggableId={task.id}
													index={index}
												>
													{(provided, snapshot) => (
														<li
															ref={provided.innerRef}
															{...provided.draggableProps}
															{...provided.dragHandleProps}
														>
															<CSSTransition
																timeout={100}
																classNames="tasks__item"
															>
																<TasksListItem
																	{...task}
																	editTask={editTask}
																/>
															</CSSTransition>
														</li>
													)}
												</Draggable>
											))}
											{provided.placeholder}
										</ul>
									)}
								</Droppable>
							</TransitionGroup>
							<ConnectedAddTaskForm projectId={project.id} />
						</>
					)}
				</div>
			</FadeComponent>
		</DragDropContext>
	);
};

export { ProjectPage };
