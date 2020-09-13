import React, { useState, useEffect } from "react";
import { Button } from "../common/Button/Button";

const ExpencesForm = ({
	categories,
	btnFunction,
	initialSelectValue,
	initialNameValue,
	initialSumValue,
	expenceId,
	setEditMode,
	userId,
}) => {
	const [nameValue, setNameValue] = useState(initialNameValue);
	const [sumValue, setSumValue] = useState(initialSumValue);
	const [categoryId, setCategoryId] = useState("");

	useEffect(() => {
		setCategoryId(initialSelectValue);
	}, [initialSelectValue]);

	return (
		<div className="form__container">
			<form
			className='form__inputsContainer'
				onSubmit={(e) => {
					e.preventDefault();
				}}
			>
				<label className='form__label' htmlFor="expenceName">Name</label>
				<input
					className="form__input"
					name="expenceName"
					type="text"
					value={nameValue}
					onChange={(e) => setNameValue(e.target.value)}
				/>
				<label className='form__label' htmlFor="expenceSum">Sum</label>
				<input
					className="form__input"
					name="expenceSum"
					type="number"
					value={sumValue}
					onChange={(e) => setSumValue(Number(e.target.value))}
				/>
				<label className='form__label' htmlFor="expenceCategory">Sum</label>
				<select
					className="form__input"
					name="expenceCategory"
					value={categoryId}
					onChange={(e) => setCategoryId(e.target.value)}
				>
					{categories.map((category) => (
						<option key={category.id} value={category.id}>
							{category.name}
						</option>
					))}
				</select>

				<Button
					type="Save"
					disabled={!sumValue || !nameValue}
					onClick={() => {
						if (expenceId) {
							btnFunction(expenceId, {
								name: nameValue,
								sum: sumValue,
								categoryId: categoryId,
							});
							setEditMode(false);
						} else {
							btnFunction({
								name: nameValue,
								sum: sumValue,
								categoryId: categoryId,
								userId,
							});
						}
						setNameValue("");
						setSumValue("");
						setCategoryId(initialSelectValue);
					}}
				>
					Save
				</Button>
			</form>
		</div>
	);
};

export { ExpencesForm };
