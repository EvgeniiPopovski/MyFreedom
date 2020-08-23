import React from "react";
import { serverAPI } from "../../API/serverAPI";
import { Button } from "../common/Button/Button";
import './../App'

class FilmListPage extends React.Component {
	render() {
		return (
			<table>
				<thead>
					<tr>
						{this.props.tableHeader.map((header) => (
							<th key={header}>{header}</th>
						))}
					</tr>
				</thead>

				<tbody>
					{this.props.films.map((film) => (
						<tr className='row' key={film.id}>
							<td>{film.title}</td>
							<td>{film.year}</td>
							<td>{film.director}</td>
							<td>{film.rating}</td>
							<td>{film.status}</td>
							<td>
								<Button onClick={() => this.props.setFilmOnEdit(film.id, "edit")} buttonMode='edit'>
									Редактировать
								</Button>
							</td>
							<td>
								<Button
									onClick={async () => {
										this.props.deleteFilm(film.id);
										try {
											await serverAPI.deleteFilm(film.id)
										} catch (e) {
											this.props.setError(e.message)
										}
									}}
									buttonMode='delete'
								>
									Удалить
								</Button>
							</td>
						</tr>
					))}
				</tbody>
			</table>
		);
	}
}
export { FilmListPage };
