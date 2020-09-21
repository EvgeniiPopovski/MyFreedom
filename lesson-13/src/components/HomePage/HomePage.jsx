import React from "react";
import { Link } from "react-router-dom";
import { Counter } from "../Counter/Counter";
import "./HomePage.css";

const HomePage = ({ counters, increment, decrement, editCounter }) => {
	if (!counters || counters.length === 0) {
		return (
			<header className="page__header">
				<h1>No counters. Please&nbsp;</h1>
				<Link className="header__link" to="/addCounter">
					add one
				</Link>
			</header>
		);
	}
	return (
		<>
			<header className="page__header">
				<h1> Counters </h1>
			</header>
			<section className="content__containter">
				<ul className='content__list'>
					{counters.map((counter) => (
						<li key={counter.id}>
							<Counter
								name={counter.name}
								value={counter.value}
								counterId={counter.id}
								increment={increment}
								decrement={decrement}
								editCounter={editCounter}
							/>
						</li>
					))}
				</ul>
				<Link className='link__button link-center' to="/addCounter">add Counter</Link>
			</section>
		</>
	);
};

export { HomePage };
