import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";

const AddCounterForm = ({ addCounter }) => {
	const [counterName, setCounterName] = useState("");
	const [counterValue, setCounterValue] = useState(0);
	const history = useHistory();

	return (
		<>
			<header className="page__header">
				<Link className="back__link" to="/home"></Link>
				<h1> Add Counter</h1>
			</header>
			<div className="form__containter">
				<form
					className="form"
					onSubmit={(e) => {
						e.preventDefault();
					}}
				>
					<div className="form__iputArea">
						<label className="label" htmlFor="name">
							Counter name
						</label>
						<input
							className="input"
							name="name"
							type="text"
							value={counterName}
							onChange={(e) => setCounterName(e.target.value)}
						/>
					</div>
					<div className="form__iputArea">
						<label className="label" htmlFor="counter">
							Counter value
						</label>
						<input
							className="input"
							name="counter"
							type="number"
							value={counterValue}
							onChange={(e) => setCounterValue(e.target.valueAsNumber)}
						/>
					</div>
					<button
                    className='form__button'
						disabled={!counterName}
						onClick={() => {
							addCounter(counterName, counterValue);
							history.push("/home");
						}}
					>
						Save
					</button>
				</form>
			</div>
		</>
	);
};

export { AddCounterForm };
