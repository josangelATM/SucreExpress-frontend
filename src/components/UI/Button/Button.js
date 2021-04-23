import React from 'react'
import './Button.css'

const Button = (props) => (
    <button onClick={props.onClick} className={props.class} type={props.type} disabled={props.disabled}>
        {props.children}
    </button>
)

export default Button;