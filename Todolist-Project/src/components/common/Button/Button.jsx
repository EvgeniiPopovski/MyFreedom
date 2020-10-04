import React from 'react';
import './Button.scss'

const buttonKind = {
    delete: 'danger',
    submit: 'submit',
    edit: 'edit',
}

const Button = ({children , onClick , kind}) => {
return <button className={`btn btn-${buttonKind[kind]}`} onClick={onClick}>{children}</button>
}

export {Button}