import React from "react";
import { Link } from "react-router-dom";
import './TaskListItem.scss'

const TasksListItem = ({
	id,
	description,
	title,
	createdOn,
	isFocusedOn,
	isDone,
	projectId,
	editTask,
}) => {
	return (
		<div className="tasks__item">
			<Link
				to={{
					pathname: `/task/info/${id}`,
					state: {projectId},
				}}
			>
				Title {title}
			</Link>
			<p>{createdOn}</p>
			<p>
				Focused?
				<input
					type="checkbox"
					checked={isFocusedOn}
					value={isFocusedOn}
					onChange={() => {
						editTask({
							id,
							title,
							createdOn,
							isFocusedOn: !isFocusedOn,
							isDone,
							projectId,
							description,
						});
					}}
				/>
			</p>
			<p>
				Is done?
				<input
					type="checkbox"
					checked={isDone}
					value={isDone}
					onChange={() => {
						editTask({
							id,
							title,
							createdOn,
							isFocusedOn,
							isDone: !isDone,
							projectId,
							description,
						});
					}}
				/>
			</p>
		</div>
	);
};

export { TasksListItem };
