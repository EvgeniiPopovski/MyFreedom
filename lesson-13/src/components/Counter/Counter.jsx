import React from "react";
import { Link } from "react-router-dom";
import "./Counter.css";

const Counter = ({ name, value, counterId, increment, decrement }) => {
	return (
		<div className="counter-item">
			<div className="counter__header">
				<h3 className="counter__title">{name}</h3>
				<Link to={`/counter/${counterId}`}>Edit</Link>
			</div>

			<div className="counter__controls">
				<div>
					<button
						className="counter__button"
						disabled={value === 0}
						onClick={() => {
							decrement(name, value - 1, counterId);
						}}
					>
						-
					</button>
				</div>
				<p className="counter__value">{value}</p>
				<div>
					<button
						className="counter__button"
						onClick={() => {
							increment(name, value + 1, counterId);
						}}
					>
						+
					</button>
				</div>
			</div>
		</div>
	);
};

export { Counter };
