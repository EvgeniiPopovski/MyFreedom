import React, { useState, useEffect } from "react";
import { ExpencesItem } from "./ExpencesItem";
import {
	getFirebaseData,
	deleteItems,
	addItems,
	editItems,
} from "../../firebaseAPI/firebase";
import { InputForm } from "../common/InputForm";
import { NavBar } from "../common/NavBar";
import { Preloader } from "../common/Preloader/Preloader";
import "./../CategoryPage/CategoryPage.css";

const ExpencesPage = ({ categories }) => {
	const [expences, setExpences] = useState(null);
	const [error, setError] = useState("");

	useEffect(() => {
		getFirebaseData("expences", setExpences);
	}, []);

	const deleteExpences = (expenceId) => {
		return deleteItems(expenceId, "expences", setExpences, expences, setError);
	};

	const addExpences = (newDataObj) => {
		return addItems(newDataObj, "expences", setExpences, expences, setError);
	};

	const editExpences = (expenceId, newData) => {
		return editItems(newData, "expences", expenceId, setExpences, expences, setError);
	};

	if (!expences || !categories) {
		return <Preloader />;
	}
	if (error) {
		return (
			<div>
				<h1>Error </h1> <p>{error}</p>
			</div>
		);
	}

	return (
		<>
			<h1>Expences</h1>
			<NavBar />

			{!categories.length && !expences.length ? (
				<p className="notation">You should fill in Categories first</p>
			) : (
				<div>
					{console.log(categories.length)}
					<ul className="list__container">
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
						<li>* DoubleClick to edit itemes</li>
					</ul>

					<InputForm
						addField={addExpences}
						render2Inputs={true}
						formName="Add Expences"
						categories={categories}
					/>
				</div>
			)}
		</>
	);
};

export { ExpencesPage };
