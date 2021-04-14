import React from 'react'
import Logo from '../Logo/Logo'
import Socials from '../Socials/Socials'
import './Footer.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMapMarkerAlt, faPhone, faEnvelopeOpenText } from '@fortawesome/free-solid-svg-icons'
import { faWhatsapp } from '@fortawesome/free-brands-svg-icons'
const Footer = () =>{
    const left = 
    <div className='left'>
        <div className='logo-footer'>
            <Logo/>
        </div>
        <div className='about'>
            <h2>SUCRE EXPRESS</h2>
            <p>
            Sucre Express es una de las principales empresas logística del mundo. 
            Su fuerte posición geográfica y logística en el mercado radica en el transporte marítimo,
            el transporte aéreo, la logística de contratos, almacenaje, courier y los negocios terrestres.
            </p>   
        </div>
    </div>

    const center = 
        <div className='center'>
                <h2>CONTACTO</h2>
                <div className='contact'>
                    <div className='contact-container'>
                        <FontAwesomeIcon icon={faMapMarkerAlt}/>
                        <p>Zona libre de Colón, edificio aeroportuario, local 7</p>
                    </div>

                    <div className='contact-container'>
                        <FontAwesomeIcon icon={faPhone}/>
                        <p>+507 439-8473 / +507 439-9371</p>
                    </div>

                    <div className='contact-container'>
                        <FontAwesomeIcon icon={faWhatsapp}/>
                        <p>+507 6892-7391</p>
                    </div>

                    <div className='contact-container'>
                        <FontAwesomeIcon icon={faEnvelopeOpenText}/>
                        <p>info@sucrexpresszl.com</p>
                    </div>
                </div>
                
                
        </div>
    const right =
        <div className='right'>
            <h2>SIGUENOS</h2>
            <p>REDES SOCIALES</p>
            <div className='socials-footer'>
                <Socials color='white'/>
            </div>
        </div>

    return(
        <footer className='footer'>
            {left}
            {center}
            {right}
        </footer>
    )
}

export default Footer;