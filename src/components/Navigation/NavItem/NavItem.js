import React from 'react'
import './NavItem.css'
const NavItem = (props) => (
    <li className='NavItem'>
        {props.children}
    </li>
)

export default NavItem;