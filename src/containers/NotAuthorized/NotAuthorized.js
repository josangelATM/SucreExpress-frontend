import React from 'react'
import { faBug } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon} from '@fortawesome/react-fontawesome'
const NotAuthorized = () =>(
    <div>
        <FontAwesomeIcon icon={faBug} size='10x'/>
        Lo siento, no estás autorizado para ver está página F
    </div>
)

export default NotAuthorized;