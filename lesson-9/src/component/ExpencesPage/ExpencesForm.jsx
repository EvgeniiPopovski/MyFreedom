import React, { useState } from 'react'
import { Button } from '../common/Button/Button';

const ExpencesForm = ({categories}) => {
    const [nameValue , setNameValue] = useState('');
    const [sumValue , setSumValue] = useState(0);
    const [collectionId , setColectionId] = useState('');

    console.log(categories)
    
    
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
					onChange={(e) => setSumValue((Number(e.target.value)))}
                />
                <select value={collectionId} >
                    {categories.map( category => <option key={category.id} value={category.id}> {category.name} </option>)}
                </select>
                
				<Button type="Save">
					Save
				</Button>
			</form>
		</div>
	);
};


export {ExpencesForm}