import React from "react";
import { CathegoryItem } from "./CathegoryItem";

import { NavBar } from "../common/NavBar";
import { Preloader } from "../common/Preloader/Preloader";
import "./CategoryPage.css";
import { CategoryForm } from "./CategoryForm";
import { NavLink } from "react-router-dom";
import { useUserContext } from "../context/UserContext";

const CategoryPage = ({ categories, deleteCategory, editCategory, addCategory }) => {
	const { user } = useUserContext();
	const {logout} = useUserContext()

	if (!categories) {
		return <Preloader />;
	}

	

	return (
		<>
			<header>
				<h1>Categories</h1>
				{user ? <label> You entered, as  {user?.displayName || user.email} <button onClick={() => logout()}> Logout </button></label> : null }
				
			</header>

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

			<ul className="list__container">
				{categories.map((category) => (
					<CathegoryItem
						category={category}
						key={category.id}
						deleteCategory={deleteCategory}
						editCategory={editCategory}
					/>
				))}
			</ul>
			<CategoryForm buttonFunc={addCategory} value="" userId={user.id} />
		</>
	);
};

export { CategoryPage };
