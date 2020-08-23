import React from "react";
import "./Input.css";

const Input = ({ label, ...props }) => {
	return (
		<div className="input_area">
			<label htmlFor='input'>{label}</label>
			<input name='input' {...props} />
		</div>
	);
};

export { Input };
