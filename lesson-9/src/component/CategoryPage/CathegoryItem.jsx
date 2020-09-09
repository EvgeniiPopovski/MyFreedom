import React, { useState, useEffect } from "react";
import "./CategoryItem.css";
import { Button } from "../common/Button/Button";
import { CategoryForm } from "./CategoryForm";

const CathegoryItem = ({ category, deleteCategory , editCategory}) => {
	const [categoryName, setNewValue] = useState(category.name);
	const [editMode, setEditMode] = useState(false);

	useEffect(() => {
		setNewValue(category.name);
	}, [category.name]);

	return (
		<>
			<li className="list__item">
				{editMode ? (
					<CategoryForm value={categoryName} buttonFunc={editCategory} documentId={category.id} setEditMode={setEditMode}/>
				) : (
					<p className="item__name"> {category.name}</p>
				)}
				<Button type="Edit" onClick={() => setEditMode(true)}>
					Edit
				</Button>
				<Button type="Delete" onClick={() => deleteCategory(category.id)}>
					Delete
				</Button>
			</li>
		</>
	);
};

export { CathegoryItem };
