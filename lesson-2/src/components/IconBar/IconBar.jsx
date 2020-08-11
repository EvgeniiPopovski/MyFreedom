import React from "react";
import clsn from "classnames"

const IconBar = ({ orientation }) => {

    let additionalClass = clsn({
        "icon-bar" : true,
        'horizontal' : orientation === 'horizontal'
    })

	return (
		<div className={additionalClass}>
            <span className="active" >
				<i className="fa fa-home"></i>
			</span>
			<span >
				<i className="fa fa-search"></i>
			</span>
			<span >
				<i className="fa fa-envelope"></i>
			</span>
			<span >
				<i className="fa fa-globe"></i>
			</span>
			<span >
				<i className="fa fa-trash"></i>
			</span>
		</div>
	);
};

export {IconBar}