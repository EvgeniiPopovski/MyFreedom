import React from "react";
import { serverAPI } from "../../API/serverAPI";
import { Button } from "../common/Button/Button";
import "./../App";

const FilmListPage = ({tableHeader , films , setFilmOnEdit , deleteFilm , setError} ) => {
	return (
		<table>
			<thead>
				<tr>
					{tableHeader.map((header) => (
						<th key={header}>{header}</th>
					))}
				</tr>
			</thead>

			<tbody>
				{films.map((film) => (
					<tr className="row" key={film.id}>
						<td>{film.title}</td>
						<td>{film.year}</td>
						<td>{film.director}</td>
						<td>{film.rating}</td>
						<td>{film.status}</td>
						<td>
							<Button
								onClick={() => setFilmOnEdit(film.id, "edit")}
								mode="edit"
							>
								Редактировать
							</Button>
						</td>
						<td>
							<Button
								onClick={async () => {
									deleteFilm(film.id);
									try {
										await serverAPI.deleteFilm(film.id);
									} catch (e) {
										setError(e.message);
									}
								}}
								mode="delete"
							>
								Удалить
							</Button>
						</td>
					</tr>
				))}
			</tbody>
		</table>
	);
};

export { FilmListPage };
