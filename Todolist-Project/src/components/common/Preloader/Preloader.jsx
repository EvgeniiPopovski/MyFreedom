import React from "react";
import './Preloader.scss'

const Preloader = () => {
	return (
		<section>
			<div className="sk-double-bounce">
				<div className="sk-child sk-double-bounce-1"></div>
				<div className="sk-child sk-double-bounce-2"></div>
			</div>
		</section>
	);
};

export {Preloader}