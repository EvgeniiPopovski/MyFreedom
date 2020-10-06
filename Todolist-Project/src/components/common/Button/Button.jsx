import React from 'react';
import './Button.scss'

const buttonKind = {
    danger: 'danger',
    submit: 'submit',
    warning: 'warning',
    transparent: 'transparent'
}

const Button = ({children , onClick , kind , disabled}) => {
return <button disabled={disabled} className={`btn btn-${buttonKind[kind]}`} onClick={onClick}>{children}</button>
}

export {Button}