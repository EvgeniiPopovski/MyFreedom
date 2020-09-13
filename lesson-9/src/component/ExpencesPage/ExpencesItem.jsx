import React, { useState } from "react";
import { Button } from "./../common/Button/Button";
import { ExpencesForm } from "./ExpencesForm";
import "./Expences.css";

const ExpencesItem = ({ expence, deleteExpences, editExpences, categories , setError }) => {
	const [editMode, setEditMode] = useState(false);
	return (
		<>
			<li className="list__item">
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
					<p className='expence__item'>
						<span className='expence__label'>Name </span> {expence.name}, <span className='expence__label' >Sum</span> {expence.sum} <span>BYN</span>, <span className='expence__label'>Category</span> {categories.find((category) => category.id === expence.categoryId)?.name ||
							"Категория была удалена"}
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
				<Button type="Delete" onClick={() => {
					try{
						deleteExpences(expence.id)
					} catch (e) {
						setError(`Error: ${e.message}`)
					}
					
				}}
					>
					Delete
				</Button>
			</li>
		</>
	);
};

export { ExpencesItem };
