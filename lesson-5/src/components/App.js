import React, { useState, useEffect } from "react";
import "./App.css";
import { serverAPI } from "../API/serverAPI";
import Preloader from "./common/Preloader/Preloader";
import { FilmListPage } from "./FIlmListPage/FilmListPage";
import { FilmFormPage } from "./FIlmFormPage/FilmFormPage";
import clsns from "classnames";
import { Button } from "./common/Button/Button";

const tableHeader = ["Название", "Год выпуска", "Режисер", "Рейтинг", "Статус"];

const displayMode = {
	list: "list",
	add: "add",
	edit: "edit",
	delete: "delete",
};

const App = () => {

	const [films, setFilms] = useState(null)
	const [loading, setLoading] = useState(true)
	const [error, setError] = useState(null)
	const [filmOnEdit, setFilmOnEdit] = useState('')
	const [renderMode, setRenderMode] = useState(displayMode.list)

	const selectFilmOnEdit = (filmId, mode) => {
		setFilmOnEdit(filmId)
		setRenderMode(displayMode[mode]);
	};

	const addFilm = (film, filmId) => {
		film.id = filmId;
		setFilms([...films, film]);
	};

	const deleteFilm = (id) => {
		setFilms([...films.filter((film) => film.id !== id)]);
	};

	const editFilm = (newFilm) => {
		let index = films.findIndex((film) => film.id === newFilm.id);
		let filmsArr = [
			...films.slice(0, index),
			newFilm,
			...films.slice(index + 1),
		];
		setFilms(filmsArr);
	};

	const setNewError = (e) => {
		setError(e);
	};

	const changeRenderMode = (mode) => {
		setRenderMode(displayMode[mode]);
	};

	const onAdd = async (changeParrentState, state, severComand, renderMode) => {
		try {
			let response = await severComand(state);
			changeParrentState(state, response.id);
			setRenderMode(renderMode);
		} catch (e) {
			setError(e.message);
		}
	};

	useEffect(() => {
		let fetchFilms = async () => {
			try {
				let payload = await serverAPI.getFilms();
				setFilms(payload)
				setLoading(false);
			} catch (error) {
				setError(error.message);
			} finally {
				setLoading(false);
			}
		}
		fetchFilms()
	}, [])



	if (loading) {
		return (
			<div>
				<Preloader />
			</div>
		);
	}
	if (error) {
		return (
			<div
				className={clsns({
					error: true,
					error__active: error,
				})}
			>
				{error}
			</div>
		);
	}
	return (
		<>
			<div className="App">
				<h1 className="section_header">ФИЛЬМ МЕНЕДЖЕР</h1>
				{renderMode === displayMode.list ? (
					<Button onClick={() => changeRenderMode("add")} mode="add">
						Добавление
					</Button>
				) : (
						<Button onClick={() => changeRenderMode("list")} mode="edit">
							К списку
						</Button>
					)}
				{renderMode === displayMode.list && (
					<FilmListPage
						tableHeader={tableHeader}
						films={films}
						setFilmOnEdit={selectFilmOnEdit}
						deleteFilm={deleteFilm}
						setError={setNewError}
					/>
				)}

				{renderMode === displayMode.add && (
					<FilmFormPage
						serverRequest={serverAPI.addFilms}
						filmOnEdit={filmOnEdit}
						changeParrentState={addFilm}
						setError={setNewError}
						onAdd={onAdd}
					/>
				)}

				{renderMode === displayMode.edit && (
					<FilmFormPage
						{...films.find(
							(film) => film.id === filmOnEdit
						)}
						filmOnEdit={filmOnEdit}
						serverRequest={serverAPI.editFilm}
						changeParrentState={editFilm}
						onAdd={onAdd}
					/>
				)}
			</div>
		</>
	);
}


export default App;
