import React from 'react'
import { faBars, faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import compStyles from './SideBarButton.module.css'
const SideBarButton = (props) =>{

    return(
        <div className={compStyles.sideBarButton}> 
            <FontAwesomeIcon className={`${compStyles.icon} ${props.toOpen ? '' : compStyles.arrow}`} onClick={props.toggle} icon={props.toOpen ? faBars : faArrowLeft}  size='5x'/>
        </div>
    )
}

export default SideBarButton;