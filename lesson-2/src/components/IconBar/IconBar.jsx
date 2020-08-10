import React from "react";
import clsn from "classnames"

const IconBar = ({ orientation }) => {

    let additionalClass = clsn({
        "icon-bar" : true,
        'horizontal' : orientation === 'horizontal'
    })

	return (
		<div className={additionalClass}>
            <a className="active" href="home.com">
				<i className="fa fa-home"></i>
			</a>
			<a href="home.com">
				<i className="fa fa-search"></i>
			</a>
			<a href="home.com">
				<i className="fa fa-envelope"></i>
			</a>
			<a href="home.com">
				<i className="fa fa-globe"></i>
			</a>
			<a href="home.com">
				<i className="fa fa-trash"></i>
			</a>
		</div>
	);
};

export {IconBar}