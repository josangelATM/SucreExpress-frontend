import React from 'react'
import { faBars, faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import compStyles from './SideBarButton.module.css'
const SideBarButton = (props) =>{

    return(
        <div className={compStyles.sideBarButton}> 
            <FontAwesomeIcon className={compStyles.icon} onClick={props.toggle} icon={props.show ? faArrowLeft : faBars}  size='5x'/>
        </div>
    )
}

export default SideBarButton;