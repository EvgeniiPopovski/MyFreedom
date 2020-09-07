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
} from "./firebaseAPI/firebase";

function App() {
	const [categories, setCategories] = useState(null);
	const [error , setError] = useState('')

	useEffect(() => {
		getFirebaseData("categories", setCategories);
	}, []);

	const deleteCategory = (categoryId) => {
		return deleteItems(categoryId, "categories", setCategories, categories , setError);
	};

	const addCategory = (newDataObj) => {
		return addItems(newDataObj, "categories", setCategories, categories , setError);
	};

	const editCategory = (categoryId, newData) => {
		return editItems(newData, "categories", categoryId, setCategories, categories, setError);
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
			<div className='app__container'>
        <div className='app__wrapper'>
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
