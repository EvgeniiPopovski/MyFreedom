import React, { useState } from "react";
import { Button } from "./../common/Button/Button";

const ExpencesItem = ({ expence, deleteExpences, editExpences, categories }) => {
	const [editMode, setEditMode] = useState(false);
	const [newName, setNewName] = useState(expence.name);
	const [newSum, setNewSum] = useState(expence.sum);
	const [categoryRef, setCategoryRef] = useState(expence.category);

	return (
		<>
			<li className="list__item wide">
				{editMode ? (
					<div>
						<input
							className="list__input"
							value={newName}
							onBlur={() => {
								setEditMode(false);
								editExpences(expence.id, {
									name: newName,
									sum: newSum,
									category: categoryRef,
								})
							}}
							onChange={(e) => setNewName(e.target.value)}
						/>
						<input
							className="list__input"
							value={newSum}
							onBlur={() => {
								setEditMode(false);
								editExpences(expence.id, {
									name: newName,
									sum: newSum,
									category: categoryRef,
								})
							}}
							onChange={(e) => setNewSum(e.target.value)}
						/>
						<select
							className="list__input"
							value={categoryRef}
							onChange={(e) => setCategoryRef(e.target.value)}
							onBlur={() => {
								setEditMode(false);
								editExpences(expence.id, {
									name: newName,
									sum: newSum,
									category: categoryRef,
								});
							}}
						>
							{categories.map((category, index) => (
								<option key={index} value={category.name}>
									{category.name}
								</option>
							))}
						</select>
					</div>
				) : (
					<p onDoubleClick={() => setEditMode(true)} className="item__name">
						<span className="label">Name: </span>
						{newName} , 
						<span className="label">Sum : </span> {newSum} <span>BYN</span> ,
						<span className="label">Category: </span>
						{categoryRef}
					</p>
				)}
				<Button type="Delete" onClick={() => deleteExpences(expence.id)}>
					Delete
				</Button>
			</li>
		</>
	);
};

export { ExpencesItem };
