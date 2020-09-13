import React, { useState } from "react";
import { Button } from "../common/Button/Button";
import './Category.css'

const CategoryForm = ({value ,  buttonFunc , documentId , setEditMode , userId  }) => {
	const [inputValue, setInputValue] = useState( value || '');

	return (
		
			<form
				onSubmit={(e) => {
					e.preventDefault();
				}}
			>
				<input
					className='form__input'
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
	);
};

export { CategoryForm };
