import React from "react";
import { FadeComponent } from "../FadeComponent/FadeComponent";
import "./Preloader.scss";

const Preloader = () => {
	return (
		<FadeComponent inProp={true} timeout={100} className={"main-container"}>
			<section>
				<div className="sk-three-bounce">
					<div className="sk-bounce-1 sk-child"></div>
					<div className="sk-bounce-2 sk-child"></div>
					<div className="sk-bounce-3 sk-child"></div>
				</div>
			</section>
		</FadeComponent>
	);
};

export { Preloader };
