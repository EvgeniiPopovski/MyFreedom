import React, { useState, useEffect } from "react";
import "./InputForm.css";
import { Button } from "./Button/Button";

const InputForm = ({ addField, render2Inputs, formName, categories }) => {
	const [data, setData] = useState({ name: "", sum: "", category: "" });
	const [renderForm, setRenderForm] = useState(false);

	useEffect(() => {
		if (categories.length) {
			setData({ ...data, category: categories[0].name });
		}
	}, []);

	if (!renderForm) {
		return (
			<div className="form__container">
				<Button type="Add Item" onClick={() => setRenderForm(true)}>
					Add Item
				</Button>
			</div>
		);
	}
	return (
		<div className="form__container">
			<form
				onSubmit={(e) => {
					e.preventDefault();
				}}
			>
				<p>
					{formName}
					<span className="close__btn" onClick={() => setRenderForm(false)}>
						Close
					</span>
				</p>
				<input
					type="text"
					value={data.name}
					onChange={(e) => setData({ ...data, name: e.target.value })}
				/>
				{render2Inputs && (
					<>
						<input
							autoFocus
							min={0}
							type="text"
							value={data.sum}
							onChange={(event) => {
								setData({ ...data, sum: event.target.value });
							}}
						/>
						<select
							value={data.category}
							onChange={(e) =>
								setData({ ...data, category: e.target.value })
							}
						>
							{categories.map((category, index) => (
								<option key={index} value={category.name}>
									{category.name}
								</option>
							))}
						</select>
					</>
				)}
				<Button
					type="Save"
					disabled={!data.name}
					onClick={() => {
						render2Inputs ? addField(data) : addField({ name: data.name });
						setData({ name: "", sum: "" });
						setRenderForm(false);
					}}
				>
					Save
				</Button>
			</form>
		</div>
	);
};

export { InputForm };
