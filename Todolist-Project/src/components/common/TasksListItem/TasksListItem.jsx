import React from "react";
import { Link } from "react-router-dom";
import starFilled from "./../../../icons/star.svg";
import starOutlined from "./../../../icons/star-outline.svg";
import "./TaskListItem.scss";
import { FadeComponent } from "../FadeComponent/FadeComponent";

const TasksListItem = ({
	id,
	description,
	title,
	createdOn,
	isFocusedOn,
	isDone,
	projectId,
	editTask,
	date,
}) => {
	return (
		<FadeComponent inProp={true} timeout={100}>
			<div className={!isDone ? "tasks__item" : "tasks__item done"}>
				<Link
					className="task__link link"
					to={{
						pathname: `/task/info/${id}`,
						state: { projectId },
					}}
				>
					{title}
				</Link>
				{isFocusedOn ? (
					<img
						src={starFilled}
						alt="focused on task"
						width="20px"
						onClick={() =>
							editTask({
								id,
								title,
								createdOn,
								isFocusedOn: !isFocusedOn,
								isDone,
								projectId,
								description,
							})
						}
					/>
				) : (
					<img
						src={starOutlined}
						alt="focused on task"
						width="20px"
						onClick={() =>
							editTask({
								id,
								title,
								createdOn,
								isFocusedOn: !isFocusedOn,
								isDone,
								projectId,
								description,
							})
						}
					/>
				)}
				<p className="tasks__item-isDone">Dat of expire: {date}</p>
				<p className="tasks__item-isDone">
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
			<p className="tasks__item-description">{description}</p>
		</FadeComponent>
	);
};

export { TasksListItem };
