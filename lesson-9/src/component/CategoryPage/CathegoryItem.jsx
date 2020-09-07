import React, { useState } from "react";

const CathegoryItem = ({ category, deleteCategory, editCategory }) => {
	const [newValue, setNewValue] = useState(category.name);
	const [editMode, setEditMode] = useState(false);
	return (
		<>
			<li>
				{editMode ? (
					<input
						type="text"
						value={newValue}
						onChange={(e) => setNewValue(e.target.value)}
						onBlur={() => {
							editCategory(category.id, {name :newValue});
							setNewValue("");
							setEditMode(false);
						}}
					/>
				) : (
					<p onDoubleClick={() => setEditMode(true)}>{category.name}</p>
				)}
				<button onClick={() => deleteCategory(category.id)}>Delete</button>
			</li>
		</>
	);
};

export { CathegoryItem };
