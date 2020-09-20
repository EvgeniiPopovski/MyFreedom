import React from "react";

const Counter = ({ name, value , counterId , increment}) => {
	return (
		<div>
			<h4>{name}</h4>
			<div>
				<div>
					<button> - </button>
				</div>
				<p>{value}</p>
				<div>
					<button onClick={() => {
                        increment(name , value+1 , counterId)
                    }}> + </button>
				</div>
			</div>
		</div>
	);
};

export {Counter}
