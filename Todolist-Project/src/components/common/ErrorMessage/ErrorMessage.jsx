import React from "react";
import { FadeComponent } from "../FadeComponent/FadeComponent";
import "./ErrorMessage.scss";

const ErrorMessage = ({ errorTxt }) => {
	return (
		<FadeComponent inProp={true} timeout={100} className={"error__section"}>
			{errorTxt}
		</FadeComponent>
	);
};

export { ErrorMessage };
