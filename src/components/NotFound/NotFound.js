import React from 'react'
import { faBug } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import compStyles from './NotFound.module.css'
import { Link } from 'react-router-dom'
const NotFound = () =>(
    <div className={compStyles.container}>
        <FontAwesomeIcon icon={faBug} size='10x'/>
        <p className={compStyles.error}>Error 404</p>
        <p className={compStyles.message}>Lo sentimos, la página que solicitaste no existe</p>
        <Link className={compStyles.link} to='/home'>Ir al inicio</Link>
    </div>
)

export default NotFound;