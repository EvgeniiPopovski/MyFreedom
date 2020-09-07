import React, { useState, useEffect } from 'react';
import './App.css';
import { CategoryPage } from './component/CategoryPage/CategoryPage';
import { ExpencesPage } from './component/ExpencesPage/ExpencesPage';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { HomePage } from './component/HomePage';
import { getFirebaseData, deleteItems, addItems, editItems } from './firebaseAPI/firebase';

function App() {

  const [categories, setCategories] = useState(null);

	useEffect(() => {
		getFirebaseData("categories", setCategories);
	}, []);

	const deleteCategory = (categoryId) => {
		return deleteItems(categoryId, "categories", setCategories, categories);
	};

	const addCategory = (newDataObj) => {
		return addItems(newDataObj, "categories", setCategories, categories);
	};

	const editCategory = (categoryId, newData) => {
		return editItems(newData , 'categories' , categoryId, setCategories , categories)
	}

  
  return (
    <BrowserRouter>
      <Switch>
        <Route path='/categories'>
          <CategoryPage categories={categories} deleteCategory={deleteCategory} addCategory={addCategory} editCategory={editCategory} />
        </Route>

        <Route path='/expences' >
          <ExpencesPage categories={categories} />
        </Route>

        <Route path='/'>
          <HomePage />
        </Route>

      </Switch>
    </BrowserRouter>
  );
}

export default App;
