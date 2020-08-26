import React from 'react';
import clsn from "classnames"

const Button = ({onClick , children, disabled , ...props}) => {
    let mode = {
        "edit" : 'button__edit',
        "add" : 'button__add',
        "delete" : 'button__delete',

    }
    return (
    <button className={clsn({
        'button__edit' : mode[props.mode] === 'button__edit',
        'button__add' : mode[props.mode] === 'button__add',
        'button__delete' : mode[props.mode] ===  'button__delete',

    })}
    disabled={disabled} 
    onClick={onClick}>{children}</button>
    )
}

export {Button}