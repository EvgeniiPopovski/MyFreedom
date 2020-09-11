import React, { useState, useEffect } from "react";
import "./App.css";
import { CategoryPage } from "./component/CategoryPage/CategoryPage";
import { ExpencesPage } from "./component/ExpencesPage/ExpencesPage";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { HomePage } from "./component/HomePage";
import {
	getFirebaseData,
	deleteItems,
	addItems,
	editItems,
	docToObject,
} from "./firebaseAPI/firebase";
import { LoginForm } from "./component/LoginForm/LoginForm";
import { RegistrationForm } from "./component/RegistrationForm/RegistrationForm";

function App() {
	const [categories, setCategories] = useState(null);
	const [error, setError] = useState("");

	useEffect(() => {
		const getCategories = async () => {
			try {
				let collection = await getFirebaseData("categories");
				setCategories(collection.docs.map(docToObject));
			} catch (e) {
				setError(`Error: ${e.message} `);
			}
		};
		getCategories();
	}, []);

	const deleteCategory = async (categoryId) => {
		try {
			deleteItems(categoryId, "categories");
			setCategories(categories.filter((item) => categoryId !== item.id));
		} catch (e) {
			setError(`Error: ${e.message} `);
		}
	};

	const addCategory = async (newDataObj) => {
		try {
			let response = await addItems(newDataObj, "categories");
			setCategories([...categories, { id: response.id, ...newDataObj }]);
		} catch (e) {
			setError(`Error: ${e.message} `);
		}
	};

	const editCategory = async (categoryId, newData) => {
		try {
			editItems(newData, "categories", categoryId);
			let obj = categories.find((item) => categoryId === item.id);
			let index = categories.indexOf(obj);
			setCategories([
				...categories.slice(0, index),
				{ id: categoryId, ...newData },
				...categories.slice(index + 1),
			]);
		} catch (e) {
			setError(`Error: ${e.message} `);
		}
	};

	if (error) {
		return (
			<div>
				<h1>Error </h1> <p>{error}</p>
			</div>
		);
	}
	return (
		<BrowserRouter>
			<div className="app__container">
				<div className="app__wrapper">
					<Switch>
						<Route path="/categories">
							<CategoryPage
								categories={categories}
								deleteCategory={deleteCategory}
								addCategory={addCategory}
								editCategory={editCategory}
							/>
						</Route>

						<Route path="/expences">
							<ExpencesPage categories={categories} />
						</Route>

						<Route path="/login">
							<LoginForm />
							<RegistrationForm />
						</Route> 

						<Route path="/">
							<HomePage />
						</Route>
					</Switch>
				</div>
			</div>
		</BrowserRouter>
	);
}

export default App;
