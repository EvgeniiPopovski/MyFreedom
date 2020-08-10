import React from "react";
import "./../../App.css";



function PropsItems({ changeProp, propsArr }) {

let renderArr = propsArr.map(item => <li key={item} onClick={() => changeProp(item)}>{item}</li>)

	return (
		<div>
			<h4>Выберите Prop</h4>
			<ul>
                {renderArr}
			</ul>
		</div>
	);
}

export { PropsItems };
