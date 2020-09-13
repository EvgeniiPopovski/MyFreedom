import React, { useState, useEffect, memo } from "react";
import { ExpencesItem } from "./ExpencesItem";
import {
	deleteItems,
	addItems,
	editItems,
	docToObject,
	getFirebaseData,
} from "../../firebaseAPI/firebase";
import { Preloader } from "../common/Preloader/Preloader";
import { ExpencesForm } from "./ExpencesForm";
import { useUserContext } from "../context/UserContext";
import { Header } from "../common/Header/Header";
import "./Expences.css";

const ExpencesPage = memo(({ categories }) => {
	const [expences, setExpences] = useState(null);
	const [error, setError] = useState("");

	const { user, logout } = useUserContext();

	useEffect(() => {
		const getExpences = async () => {
			try {
				let collection = await getFirebaseData("expences", user.id);
				setExpences(collection.docs.map(docToObject));
			} catch (e) {
				setError(`Error : ${e.message}`);
			}
		};
		getExpences();
	}, [user.id]);

	const deleteExpences = async (expenceId) => {
		try {
			deleteItems(expenceId, "expences");
			setExpences(expences.filter((item) => expenceId !== item.id));
		} catch (e) {
			setError(`Error : ${e.message}`);
		}
	};

	const addExpences = async (newDataObj) => {
		try {
			let response = await addItems(newDataObj, "expences");
			setExpences([...expences, { id: response.id, ...newDataObj }]);
		} catch (e) {
			setError(`Error: ${e.message} `);
		}
	};

	const editExpences = async (expenceId, newData) => {
		try {
			editItems(newData, "expences", expenceId);
			let obj = expences.find((item) => expenceId === item.id);
			let index = expences.indexOf(obj);
			setExpences([
				...expences.slice(0, index),
				{ id: expenceId, ...newData },
				...expences.slice(index + 1),
			]);
		} catch (e) {
			setError(`Error: ${e.message} `);
		}
	};

	if (!categories || !expences) {
		return (
			<>
				<Header user={user} logout={logout} /> <Preloader />{" "}
			</>
		);
	}
	// if (error) {
	// 	return (
	// 		<div>
	// 			<h1>Error </h1> <p>{error}</p>
	// 		</div>
	// 	);
	// }

	return (
		<>
			<Header user={user} logout={logout} pageName="Expences" />

			{error && <div className="error">{error}</div>}

			{!categories.length && !expences.length ? (
				<p className="notation">You should fill in Categories first</p>
			) : (
				<div>
					<ul className="expences">
						{expences.map((expence) => (
							<ExpencesItem
								expence={expence}
								key={expence.id}
								deleteExpences={deleteExpences}
								editExpences={editExpences}
								categories={categories}
							/>
						))}
					</ul>
					{!categories.length ? (
						<p className="notation">Please enter category first</p>
					) : (
						<section className="container">
							<div className="form expences_form">
								<h3 className="form__title">Add Expences</h3>
								<ExpencesForm
									btnFunction={addExpences}
									categories={categories}
									initialSelectValue={categories[0].id}
									initialSumValue={""}
									initialNameValue={""}
									userId={user.id}
								/>
							</div>
						</section>
					)}
				</div>
			)}
		</>
	);
});

export { ExpencesPage };
