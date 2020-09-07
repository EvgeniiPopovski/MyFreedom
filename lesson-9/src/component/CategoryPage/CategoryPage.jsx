import React from 'react'
import { CathegoryItem } from "./CathegoryItem";
import { InputForm } from "../common/InputForm";
import { NavBar } from '../common/NavBar';
import { Preloader } from '../common/Preloader/Preloader';
import './CategoryPage.css'

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
			<InputForm addField={addCategory} render2Inputs={false} formName='Add Category' categories={categories}/>
		</>
	);
};

export { CategoryPage };
