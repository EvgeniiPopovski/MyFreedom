import React from "react";
import './ErrorMessage.scss'

const ErrorMessage = ({ errorTxt }) => {
	return <div className="error__section">{errorTxt}</div>;
};

export {ErrorMessage}