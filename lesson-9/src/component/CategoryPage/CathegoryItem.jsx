import React, { useState, useEffect } from "react";
import "./CategoryItem.css"
import { Button } from "../common/Button/Button";

const CathegoryItem = ({ category, deleteCategory, editCategory }) => {
	const [newValue, setNewValue] = useState(category.name);
	const [editMode, setEditMode] = useState(false);
	useEffect(() => {
		setNewValue(category.name)
	}, [category.name])
	return (
		<>
			<li className='list__item'>
				{editMode ? (
					<input
						className='list__input'
						type="text"
						autoFocus
						value={newValue}
						onChange={(e) => setNewValue(e.target.value)}
						onBlur={() => {
							editCategory(category.id, {name :newValue});
							setEditMode(false);
							setNewValue("");
						}}
					/>
				) : (
					<p className='item__name' onDoubleClick={() => setEditMode(true)}>{category.name}</p>
				)}
				<Button type='Delete' onClick={() => deleteCategory(category.id)}>Delete</Button>
			</li>
		</>
	);
};

export { CathegoryItem };
