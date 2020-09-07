import React, { useState } from "react";

const ExpencesItem = ({ expence, deleteExpences, editExpences , categories, expenceCategory }) => {
	const [editMode, setEditMode] = useState(false);
	const [newName, setNewName] = useState(expence.name);
	const [newSum, setNewSum] = useState(expence.sum);
	const [categoryRef , setCategoryRef] = useState(expenceCategory)

	return (
		<>
			<li>
				{editMode ? (
					<div>
						<input
							value={newName}
							onBlur={() => {
								setEditMode(false);
								editExpences(expence.id, {name : newName,sum :  newSum});
							}}
							onChange={(e) => setNewName(e.target.value)}
						/>
						<input
							value={newSum}
							onBlur={() => {
								setEditMode(false);
								editExpences(expence.id, {name : newName,sum :  newSum});
							}}
							onChange={(e) => setNewSum(e.target.value)}
						/>
						<select value={categoryRef} onChange={(e) => setCategoryRef(e.target.value)} onBlur={() => {
								setEditMode(false);
								editExpences(expence.id, {name : newName,sum :  newSum , category: categoryRef});
							}}>
							{categories.map( (category, index) => <option key={index} value={category.name}> {category.name} </option>)}
						</select>
					</div>
				) : (
					<p onDoubleClick={() => setEditMode(true)}>
						{expence.name} , {expence.sum} , {expence.category}
					</p>
				)}
				<button onClick={() => deleteExpences(expence.id)}>Delete</button>
			</li>
		</>
	);
};

export { ExpencesItem };
