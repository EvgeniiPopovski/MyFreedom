import React from "react";
import { Button } from "../common/Button/Button";
import { Input } from "../common/Input/Input";

const selectOptions = ["Просмотрен", "Не просмотрен", "Хочу Посмотреть"];
const validateYear = (year, rating, title, director) => {
	if (!year || !rating || !title || !director) {
		return true;
	}
	if (Number(year) < 1895 || Number(year) > new Date().getFullYear() + 5) {
		return true;
	}
	if (Number(rating) < 1 || Number(rating) > 10) {
		return true;
	}
	return false;
};

class FilmFormPage extends React.Component {
	state = {
		id: this.props.filmOnEdit || null,
		title: this.props.title || "",
		year: this.props.year || new Date().getFullYear(),
		director: this.props.director || "",
		rating: this.props.rating || "1",
		status: this.props.status || selectOptions[0],
	};
	render() {
		return (
			<>
				<h1 className="section_header">Добаление фильма</h1>
				<form
					onSubmit={(e) => {
						e.preventDefault();
					}}
				>
					<Input
						label="Название фильма"
						reauired={true}
						type="text"
						placeholder="Название фильма"
						onChange={(e) => this.setState({ title: e.target.value })}
						value={this.state.title}
					/>

					<Input
						label="Год выхода"
						type="number"
						min={1895}
						placeholder="год выхода фильма"
						max={new Date().getFullYear() + 5}
						onChange={(e) => {
							this.setState({ year: Math.round(e.target.value) });
						}}
						value={this.state.year}
					/>

					<Input
						label="Режисер"
						required={true}
						type="text"
						onChange={(e) => this.setState({ director: e.target.value })}
						value={this.state.director}
					/>

					<Input
						label="Рейтинг"
						placeholder="оценка от 1 до 5"
						required={true}
						type="number"
						min={1}
						max={10}
						step={0.1}
						onChange={(e) => this.setState({ rating: e.target.value})}
						value={this.state.rating}
					/>

					<div className="select__area">
						<label className="label__select" htmlFor="fildSelect">
							Статус
						</label>
						<select
							className="select"
							name="fildSelect"
							onChange={(e) => this.setState({ status: e.target.value })}
							value={this.state.status}
						>
							{selectOptions.map((option) => (
								<option key={option} value={option}>
									{option}
								</option>
							))}
						</select>
					</div>
					<Button
						disabled={validateYear(
							this.state.year,
							this.state.rating,
							this.state.title,
							this.state.director
						)}
						buttonMode="add"
						onClick={async () => {
							try {
								this.props.changeParrentState(this.state);
								await this.props.serverRequest(this.state);
								this.props.changeRenderMode("list");
							} catch (e) {
								console.log(e);
								this.props.setError(e.message);
							}
						}}
					>
						Coхранить
					</Button>
				</form>
			</>
		);
	}
}

export { FilmFormPage };
