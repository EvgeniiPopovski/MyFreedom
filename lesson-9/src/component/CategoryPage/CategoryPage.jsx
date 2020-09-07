import React from 'react'
import { CathegoryItem } from "./CathegoryItem";
import { InputForm } from "../common/InputForm";

const CategoryPage = ({categories , deleteCategory , editCategory , addCategory}) => {

	if (!categories) {
		return <p>...Loading...</p>;
	}

	return (
		<>
			<h1>Categories</h1>
			<ul>
				{categories.map((category) => (
					<CathegoryItem
						category={category}
						key={category.id}
						deleteCategory={deleteCategory}
						editCategory={editCategory}
					/>
				))}
			</ul>
			<InputForm addField={addCategory} render2Inputs={false} formName='Add Category' categories={categories}/>
		</>
	);
};

export { CategoryPage };
