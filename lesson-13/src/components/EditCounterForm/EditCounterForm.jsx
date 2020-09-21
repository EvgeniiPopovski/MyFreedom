import React, { useState } from "react";
import { Link, useHistory, useParams } from "react-router-dom";

const EditCounterForm = ({ counters, editCounter, deleteCounter }) => {
	const history = useHistory();
	const params = useParams();

	let counterOnEdit = counters.find((counter) => counter.id === params.counterId);

	const [counterName, setCounterName] = useState(counterOnEdit.name);
	const [counterValue, setCounterValue] = useState(counterOnEdit.value);

	return (
		<>
			<header className="page__header">
				<Link className="back__link" to="/home"></Link>
				<h1> Edit Counter</h1>
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
							enter counter name
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
							enter initial value{" "}
						</label>
						<input
							className="input"
							name="counter"
							type="number"
							value={counterValue}
							onChange={(e) => setCounterValue(e.target.valueAsNumber)}
						/>
					</div>
					<div className='form-buttons__containter'>
						<button
							className="form__button"
							disabled={!counterName}
							onClick={() => {
								editCounter(counterName, counterValue, params.counterId);
								history.push("/home");
							}}
						>
							Save
						</button>
						<button
							className="form__button delete"
							onClick={() => {
								deleteCounter(params.counterId);
								history.push("/home");
							}}
						>
							Delete
						</button>
					</div>
				</form>
			</div>
		</>
	);
};

export { EditCounterForm };
