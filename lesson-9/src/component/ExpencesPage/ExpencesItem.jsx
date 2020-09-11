import React, { useState } from "react";
import { Button } from "./../common/Button/Button";
import { ExpencesForm } from "./ExpencesForm";

const ExpencesItem = ({ expence, deleteExpences, editExpences, categories }) => {
	const [editMode, setEditMode] = useState(false);
	return (
		<>
			<li className="list__item wide">
				{editMode ? (
					<ExpencesForm
						categories={categories}
						btnFunction={editExpences}
						setEditMode={setEditMode}
						initialNameValue={expence.name}
						initialSumValue={Number(expence.sum)}
						initialSelectValue={expence.categoryId}
						expenceId={expence.id}
					/>
				) : (
					<p>
						Наименование {expence.name} , Стоимость {expence.sum} , категория {categories.find((category) => category.id === expence.categoryId)?.name || "Категория была удалена"}
					</p>
				)}
				{editMode ? (
					<Button type="Edit" onClick={() => setEditMode(false)}>
						Cancel
					</Button>
				) : (
					<Button type="Edit" onClick={() => setEditMode(true)}>
						Edit
					</Button>
				)}
				<Button type="Delete" onClick={() => deleteExpences(expence.id)}>
					Delete
				</Button>
			</li>
		</>
	);
};

export { ExpencesItem };
