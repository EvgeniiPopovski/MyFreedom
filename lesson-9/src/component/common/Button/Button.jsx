import React from 'react'
import './Button.css'

const Button = ({type ,disabled , onClick , children}) => {
    let btnType = {
        "Save" : 'save',
        "Add Item": 'add',
        "Delete" : 'delete', 
        "Edit" : 'edit'
    }
    return (
        <button	className={`button ${btnType[type]}`} disabled={disabled} onClick={onClick}>{children}</button>
    )
}

export {Button}