import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faInstagram,faFacebook,faWhatsapp,faTwitter } from '@fortawesome/free-brands-svg-icons'
import './Socials.css'

const Socials = (props) => (

    <div className={`Socials ${props.color}`}>
        <a href='/'> 
            <FontAwesomeIcon icon={faInstagram} size='3x'/>
        </a>
        <a href='/'> 
            <FontAwesomeIcon icon={faFacebook} size='3x'/>
        </a>
        <a href='/'> 
            <FontAwesomeIcon icon={faWhatsapp} size='3x'/>
        </a>
        <a href='/'> 
            <FontAwesomeIcon icon={faTwitter} size='3x'/>
        </a>
    </div>
)


export default Socials;