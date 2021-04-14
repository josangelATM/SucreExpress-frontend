import React from 'react'
import './Header.css'
import { NavLink } from 'react-router-dom'
import { withRouter } from 'react-router'
import { useSelector } from 'react-redux'
import Logo from '../../Logo/Logo'
import Auxiliary from '../../../hoc/Auxilary/Auxiliary'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronDown } from '@fortawesome/free-solid-svg-icons'
import ProfileHeader from '../ProfileHeader/ProfileHeader'

const Header = () =>{
    
    const isAdmin = useSelector(state => state.auth.isAdmin)
    const isLogged = useSelector(state => state.auth.isLogged)

    const adminLinks = 
        <Auxiliary>
            <NavLink exact to='/' className='NavItem NavItem-title' activeClassName='active'>
                INICIO
            </NavLink>
            <div className='NavItem' activeClassName='active'>
                <div className='NavItem-title'>
                    <span>
                        PAQUETES
                    </span>
                    <FontAwesomeIcon icon={faChevronDown} size='1x'/>
                </div>
                <div className='dropdown-content'>
                    <NavLink to='/package/add'>
                        Registrar
                    </NavLink>
                    <NavLink to='/package/search'>
                        Buscar
                    </NavLink>
                </div>
            </div>
            
            <div className='NavItem' activeClassName='active'>
                <div className='NavItem-title'>
                    <span>
                        COTIZACIONES
                    </span>
                    <FontAwesomeIcon icon={faChevronDown} size='1x'/>
                </div>
                <div className='dropdown-content'>
                    <NavLink to='/quotation/add'>
                        Solicitar
                    </NavLink>
                    <NavLink to='/quotation/search'>
                        Buscar
                    </NavLink>
                </div>
            </div>
            <div className='NavItem' activeClassName='active'>
                 <div className='NavItem-title'>
                    <span>
                        USUARIOS
                    </span>
                    <FontAwesomeIcon icon={faChevronDown} size='1x'/>
                </div>
                <div className='dropdown-content'>
                    <NavLink to='/users/add'>
                        Registrar
                    </NavLink>
                    <NavLink to='/users/search'>
                        Buscar
                    </NavLink>
                </div>
            </div>
            <NavLink exact to='/request' className='NavItem NavItem-title' activeClassName='active'>
                SOLICITUDES
            </NavLink>
        </Auxiliary>

    const customerLinks = 
        <Auxiliary>
        <NavLink exact to='/' className='NavItem NavItem-title' activeClassName='active'>
            INICIO
        </NavLink>
        <div className='NavItem' activeClassName='active'>
            <div className='NavItem-title'>
                    <span>
                        PAQUETES
                    </span>
                    <FontAwesomeIcon icon={faChevronDown} size='1x'/>
            </div>
            <div className='dropdown-content'>
                <NavLink to='/package/add'>
                    Mis paquetes
                </NavLink>
                <NavLink to='/package/search'>
                    Buscar
                </NavLink>
            </div>
        </div>
        
        <div className='NavItem' activeClassName='active'>
            <div className='NavItem-title'>
                    <span>
                        COTIZACIONES
                    </span>
                    <FontAwesomeIcon icon={faChevronDown} size='1x'/>
            </div>
            <div className='dropdown-content'>
                <NavLink to='/quotation/add'>
                    Solicitar
                </NavLink>
                <NavLink to='/quotation/search'>
                    Buscar
                </NavLink>
            </div>
        </div>
        <NavLink exact to='/contact' className='NavItem NavItem-title' activeClassName='active'>
                CONTACTO
        </NavLink>
    </Auxiliary>
 

            // { isLogged ? <NavLink exact to='/logout' className='NavItem' activeClassName='active'>
            //     CERRAR SESIÓN
            // </NavLink> : <NavLink exact to='/login' className='NavItem' activeClassName='active'>
            //     INICIAR SESIÓN
            // </NavLink> }

            // { isLogged ? null : <NavLink exact to='/register' className='NavItem' activeClassName='active'>
            //     REGISTRARSE
            // </NavLink>  }

    return(
    <header className='Header'>
        <div className='logo-navbar'>
            <Logo/>
        </div>
        <nav className='Navbar'>
            { isLogged ? (isAdmin ? adminLinks : customerLinks) : customerLinks}
        </nav>
        <div className='profile-container'>
            <ProfileHeader />   
        </div>
        
    </header>
    
    
)
    
    }
export default Header;