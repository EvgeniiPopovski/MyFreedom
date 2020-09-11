import React, { useState, useEffect } from "react";
import { Button } from "../common/Button/Button";

const ExpencesForm = ({ categories, btnFunction, initialSelectValue , initialNameValue , initialSumValue , expenceId , setEditMode , userId}) => {
	const [nameValue, setNameValue] = useState(initialNameValue);
	const [sumValue, setSumValue] = useState(initialSumValue);
	const [categoryId, setCategoryId] = useState('');

	useEffect(() => {
		setCategoryId(initialSelectValue);
	}, [initialSelectValue]);

	return (
		<div className="form__container">
			<form
				onSubmit={(e) => {
					e.preventDefault();
				}}
			>
				<p>Add Expences</p>
				<input
					type="text"
					value={nameValue}
					onChange={(e) => setNameValue(e.target.value)}
				/>
				<input
					type="number"
					value={sumValue}
					onChange={(e) => setSumValue(Number(e.target.value))}
				/>
				<select value={categoryId} onChange={(e) => setCategoryId(e.target.value)}>
					{categories.map((category) => (
						<option key={category.id} value={category.id}>
							{category.name}
						</option>
					))}
				</select>
				
				
				<Button
					type="Save"
					onClick={() =>{
						if(expenceId) {
							btnFunction(expenceId , { name: nameValue, sum: sumValue, categoryId: categoryId })
							setEditMode(false)
						} else {
							btnFunction({ name: nameValue, sum: sumValue, categoryId: categoryId , userId})
						}
						setNameValue('')
						setSumValue('')
						setCategoryId(initialSelectValue)
					}
					
					}
				>
					Save
				</Button>
			</form>
		</div>
	);
};

export { ExpencesForm };
