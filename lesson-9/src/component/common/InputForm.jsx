import React, { useState } from "react";

const InputForm = ({ addField, render2Inputs, formName, categories }) => {
	const [data, setData] = useState({ name: "", sum: "" , category : categories[0]});

	return (
		<>
			<p>{formName}</p>
			<form
				onSubmit={(e) => {
					e.preventDefault();
				}}
			>
				<input
					type="text"
					value={data.name}
					onChange={(e) => setData({ ...data, name: e.target.value })}
				/>
				{render2Inputs && (
					<>
						<input
							type="number"
							value={data.sum}
							onChange={(e) => setData({ ...data, sum: e.target.value })}
						/>
						<select
							value={data.category}
							onChange={(e) => setData({ ...data, category: e.target.value })}
						>
							{categories.map((category, index) => (
								<option key={index} value={category.name}>
									{category.name}
								</option>
							))}
						</select>
					</>
				)}
				<button
					disabled={!data.name}
					onClick={() => {
						render2Inputs ? addField(data) : addField({ name: data.name });
						setData({ name: "", sum: "" });
					}}
				>
					Save
				</button>
			</form>
		</>
	);
};

export { InputForm };
