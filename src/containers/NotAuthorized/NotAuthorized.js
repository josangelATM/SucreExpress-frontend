import React from 'react'
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import compStyles from './NotAuthorized.module.css'
import { Link } from 'react-router-dom'
const NotAuthorized = () =>(
    <div className={compStyles.container}>
        <FontAwesomeIcon icon={faExclamationTriangle} size='10x'/>
        <p className={compStyles.message}>Lo sentimos, no estás autorizado para ver está página</p>
        <Link className={compStyles.link} to='/home'>Ir al inicio</Link>
    </div>
)

export default NotAuthorized;