import React from "react";

const Input = ({value , label , onChange}) => {
	return (
		<div>
			<label> {label}
				<input
					type="text"
					value={value}
					onChange={(e) => onChange(e.target.value)}
				/>
			</label>
		</div>
	);
};

export { Input };
