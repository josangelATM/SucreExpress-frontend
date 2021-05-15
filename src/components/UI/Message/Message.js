import React, { useState } from 'react'
import './Message.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faTimesCircle} from '@fortawesome/free-solid-svg-icons'
const Message = (props) => {
    const [show,setShow] = useState(true) 
    return(
        <div className={`Message ${props.class} ${show ? 'show':'hidden'}`}>
            <div className={'closeContainer'}>
                <FontAwesomeIcon className={'closeBtn'} icon={faTimesCircle} size='1x' onClick={() =>{ setShow(false) }}/>
            </div>
            {props.message}
        </div>
        )
}

export default Message;