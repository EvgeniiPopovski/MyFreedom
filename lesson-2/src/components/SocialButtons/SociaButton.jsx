import React from "react";
import classNames from "classnames"
import './../../App.css';

function SociaButton({type}) {

    let clsn = classNames({
        'facebook' : type === 'facebook',
        'twitter' : type === 'twitter',
        'youtube' : type === 'youtube',
        'pinterest' : type === 'pinterest',
        'linkedin' : type === 'linkedin',
        'instagram' : type === 'instagram',
    })

	return (
    <>
      <button className={`fa fa-${clsn}`} alt='value'></button>
    </>
	);
}

export  {SociaButton};
