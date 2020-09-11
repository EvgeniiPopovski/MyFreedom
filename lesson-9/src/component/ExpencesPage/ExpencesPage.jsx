import React, { useState, useEffect } from "react";
import { ExpencesItem } from "./ExpencesItem";
import {
	getFirebaseData,
	deleteItems,
	addItems,
	editItems,
	docToObject,
} from "../../firebaseAPI/firebase";
import { NavBar } from "../common/NavBar";
import { Preloader } from "../common/Preloader/Preloader";
import "./../CategoryPage/CategoryPage.css";
import { ExpencesForm } from "./ExpencesForm";
import { NavLink } from "react-router-dom";
import { useUserContext } from "../context/UserContext";

const ExpencesPage = ({ categories }) => {
	const [expences, setExpences] = useState(null);
	const [error, setError] = useState("");

	const {user} = useUserContext()

	useEffect(() => {
		const getExpences = async () => {
			try {
				let collection = await getFirebaseData("expences");
				setExpences(collection.docs.map(docToObject));
			} catch (e) {
				setError(`Error : ${e.message}`);
			}
		};
		getExpences();
	}, []);

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
			<NavBar>
				<NavLink className="navBar__item navBar__link" to="/categories">
					to Categories
				</NavLink>

				<NavLink className="navBar__item navBar__link" to="/expences">
					to Expences
				</NavLink>

				<NavLink exact className="navBar__item navBar__link" to="/">
					Home
				</NavLink>
			</NavBar>

			{!categories.length && !expences.length ? (
				<p className="notation">You should fill in Categories first</p>
			) : (
				<div>
					<ul className="list__container">
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

					<ExpencesForm
						btnFunction={addExpences}
						categories={categories}
						initialSelectValue={categories[0].id}
						initialSumValue={""}
						initialNameValue={""}
						userId = {user.id}
					/>
				</div>
			)}
		</>
	);
};

export { ExpencesPage };
