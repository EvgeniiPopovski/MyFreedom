import React from 'react'
import { CathegoryItem } from "./CathegoryItem";

import { NavBar } from '../common/NavBar';
import { Preloader } from '../common/Preloader/Preloader';
import './CategoryPage.css'
import { CategoryForm } from './CategoryForm';

const CategoryPage = ({categories , deleteCategory , editCategory , addCategory}) => {

	if (!categories) {
		return <Preloader />;
	}

	return (
		<>
			<h1>Categories</h1>
			<NavBar />
			<ul className='list__container'>
				{categories.map((category) => (
					<CathegoryItem
						category={category}
						key={category.id}
						deleteCategory={deleteCategory}
						editCategory={editCategory}
					/>
				))}
				<li>* DoubleClick to edit itemes</li>
			</ul>
			<CategoryForm buttonFunc={addCategory} value='' />
		</>
	);
};

export { CategoryPage };
