import React from 'react';
import clsn from "classnames"

const Button = ({onClick , children, buttonMode, disabled}) => {
    let mode = {
        "edit" : 'button__edit',
        "add" : 'button__add',
        "delete" : 'button__delete',

    }
    return (
    <button className={clsn({
        'button__edit' : mode[buttonMode] === 'button__edit',
        'button__add' : mode[buttonMode] === 'button__add',
        'button__delete' : mode[buttonMode] ===  'button__delete',

    })}
    disabled={disabled} 
    onClick={onClick}>{children}</button>
    )
}

export {Button}