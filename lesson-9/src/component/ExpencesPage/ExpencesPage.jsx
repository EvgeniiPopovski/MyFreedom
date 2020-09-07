import React, { useState, useEffect } from "react";
import { ExpencesItem } from "./ExpencesItem";
import {
	getFirebaseData,
	deleteItems,
	addItems,
    editItems,
} from "../../firebaseAPI/firebase";
import { InputForm } from "../common/InputForm";

const ExpencesPage = ({categories}) => {
	const [expences, setExpences] = useState(null);

	useEffect(() => {
		getFirebaseData("expences", setExpences);
	}, []);

	const deleteExpences = (expenceId) => {
		return deleteItems(expenceId, "expences", setExpences, expences);
	};

	const addExpences = (newDataObj) => {
		return addItems(newDataObj, "expences", setExpences, expences);
	};

	const editExpences = (expenceId, newData) => {
		return editItems(newData, "expences", expenceId, setExpences, expences);
	};

	if (!expences || !categories) {
		return <p>...Loading...</p>;
	}
	return (
		<>
			<>
				<h1>Expences</h1>
				<ul>
					{expences.map((expence) => (
						<ExpencesItem
							expence={expence}
							key={expence.id}
							deleteExpences={deleteExpences}
                            editExpences={editExpences}
                            categories={categories}
                            expenceCategory={expence.category}
						/>
					))}
				</ul>
                <InputForm addField={addExpences} render2Inputs={true} formName='Add Expences' categories={categories}/>
			</>
		</>
	);
};

export { ExpencesPage };
