import React from "react";
import { CathegoryItem } from "./CathegoryItem";
import { Preloader } from "../common/Preloader/Preloader";
import { CategoryForm } from "./CategoryForm";
import { useUserContext } from "../context/UserContext";
import { Header } from "../common/Header/Header";
import "./Category.css";

const CategoryPage = ({ categories, deleteCategory, editCategory, addCategory }) => {
	const { user } = useUserContext();
	const { logout } = useUserContext();

	if (!categories) {
		return (
			<>
				<Header user={user} logout={logout} />
				<Preloader />
				<CategoryForm buttonFunc={addCategory} value="" userId={user.id} />
			</>
		);
	}

	return (
		<>
			<Header user={user} logout={logout} pageName="Categories" />
			<ul className="categories">
				{categories.map((category) => (
					<CathegoryItem
						category={category}
						key={category.id}
						deleteCategory={deleteCategory}
						editCategory={editCategory}
					/>
				))}
			</ul>
			<section className="container">
				<div className='form'>
					<h3 className="fornm__title">Add Category</h3>
					<CategoryForm buttonFunc={addCategory} value="" userId={user.id} />
				</div>
			</section>
		</>
	);
};

export { CategoryPage };
