import React, { useState } from "react";
import { Button } from "../common/Button/Button";

const CategoryForm = ({value ,  buttonFunc , documentId , setEditMode , userId}) => {
	const [inputValue, setInputValue] = useState( value || '');

	return (
		<div className="form__container">
			<form
				onSubmit={(e) => {
					e.preventDefault();
				}}
			>
				<p>Add Categories</p>
				<input
					type="text"
					value={inputValue}
					onChange={(e) => setInputValue(e.target.value)}
				/>
                
				<Button
					type="Save"
                    disabled={!inputValue}
                    
					onClick={() => {
                        if (documentId) {
							buttonFunc( documentId , { name: inputValue })
							setEditMode(false)
                        } else {
							buttonFunc({ name: inputValue , userId });
						}
						
						setInputValue("");
					}}
				>
					Save
				</Button>
			</form>
		</div>
	);
};

export { CategoryForm };
