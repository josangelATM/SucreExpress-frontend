import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faInstagram,faFacebook,faWhatsapp,faTwitter } from '@fortawesome/free-brands-svg-icons'
import './Socials.css'

const Socials = (props) => (

    <div className={`Socials ${props.color}`}>
        <a href='https://www.instagram.com/sucrexpress/'> 
            <FontAwesomeIcon icon={faInstagram} size='3x'/>
        </a>
        <a href='https://api.whatsapp.com/send?phone=50769198012'> 
            <FontAwesomeIcon icon={faWhatsapp} size='3x'/>
        </a>
    </div>
)


export default Socials;