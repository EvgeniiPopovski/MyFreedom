import React, { useState } from "react";
import { Button } from "./../common/Button/Button";
import { ExpencesForm } from "./ExpencesForm";

const ExpencesItem = ({ expence, deleteExpences, editExpences, categories }) => {
	const [editMode, setEditMode] = useState(false);
	const [expenceName, setExpenceName] = useState(expence.name);
	const [expenceSum, setExpenceSum] = useState(expence.sum);
	const [categoryRef, setCategoryRef] = useState(expence.categoryId);



	return (
		<>
			<li className="list__item wide">
				{editMode ? (
					<ExpencesForm categories={categories} />
				) : (
					<p>
						Наименование {expenceName} , Стоимость {expenceSum}
					</p>
				)}
				<Button type="Edit" onClick={() => setEditMode(true)}>
					Edit
				</Button>
				<Button type="Delete" onClick={() => deleteExpences(expence.id)}>
					Delete
				</Button>
			</li>
		</>
	);
};

export { ExpencesItem };
