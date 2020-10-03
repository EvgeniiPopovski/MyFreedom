import React from "react";
import "./Preloader.scss";

const Preloader = () => {
	return (
		<section>
			<div className="sk-three-bounce">
				<div className="sk-bounce-1 sk-child"></div>
				<div className="sk-bounce-2 sk-child"></div>
				<div className="sk-bounce-3 sk-child"></div>
			</div>
		</section>
	);
};

export { Preloader };
