import React from "react";
import { Header } from "./components/Header";
import { TodoItem } from "./components/TodoItem";
import { Input } from "./components/Input";
import { AddBtn } from "./components/Buttons/AddButton";
import { ChangeBtn } from "./components/Buttons/ChangeButton";
import { DeleteBtn } from "./components/Buttons/DeleteButton";
import './app.css'

const App = () => {
    const todoText = ["Redux", "React", "JS", "CSS", "HTML"];
    const todoes = todoText.map((item) => <TodoItem itemText={item} />)

	return (
		<div className='mainContainer'>
			<Header />
			<ul className='itemsList'>
				{todoes}
			</ul>
			<Input />
			<div className='buttonsContainer'>
				<AddBtn />
                <ChangeBtn />
				<DeleteBtn />
			</div>
		</div>
	);
};

export { App };
