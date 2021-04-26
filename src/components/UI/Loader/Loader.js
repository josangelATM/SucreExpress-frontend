import React from 'react'
import './Loader.css'

const Loader = (props) => (
    <div class={`lds-ellipsis ${props.hidden ? 'hidden' : ''}`} ><div></div><div></div><div></div><div></div></div>
)

export default Loader;