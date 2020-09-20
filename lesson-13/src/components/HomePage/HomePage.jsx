import React from "react";
import { Link } from "react-router-dom";
import { Counter } from "../Counter/Counter";

const HomePage = ({ counters  , increment }) => {
	if (!counters || counters.length === 0) {
		return <h1>No counters. Please <Link to='/addCounter'>add one</Link></h1>;
	}
	return (
		<>
			<ul>
				{counters.map((counter) => (
					<li key={counter.id}>
						<Counter name={counter.name} value={counter.value} counterId={counter.id} increment={increment}/>
					</li>
				))}
			</ul>
			<Link to='/addCounter'>add Counter</Link>
		</>
	);
};

export { HomePage };
