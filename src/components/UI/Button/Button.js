import React from 'react'
import './Button.css'

const Button = (props) => (
    
    <button onClick={props.onClick} className={`${props.size} ${props.class}`} type={props.type} disabled={props.disabled} id={props.id}>
        {props.children}
    </button>
)

export default Button;