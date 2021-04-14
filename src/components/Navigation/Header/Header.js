import React from 'react'
import './Header.css'
import { NavLink } from 'react-router-dom'
import { withRouter } from 'react-router'
import { useSelector } from 'react-redux'
import Logo from '../../Logo/Logo'
import Socials from '../../Socials/Socials'

const Header = () =>{
    
    const user = useSelector(state => state.auth.user)
    const isLogged = useSelector(state => state.auth.isLogged)


    return(

    <header className='Header'>
        <div className='logo-navbar'>
            <Logo/>
        </div>
        <nav className='Navbar'>
            <NavLink exact to='/' className='NavItem' activeClassName='active'>
                INICIO
            </NavLink>
            <NavLink exact to='/package' className='NavItem' activeClassName='active'>
                PAQUETES
            </NavLink>
            <NavLink exact to='/quotation' className='NavItem' activeClassName='active'>
                COTIZACIONES
            </NavLink>
            <NavLink exact to='/contact' className='NavItem' activeClassName='active'>
                CONTACTO
            </NavLink>

            { isLogged ? <NavLink exact to='/logout' className='NavItem' activeClassName='active'>
                CERRAR SESIÓN
            </NavLink> : <NavLink exact to='/login' className='NavItem' activeClassName='active'>
                INICIAR SESIÓN
            </NavLink> }

            { isLogged ? null : <NavLink exact to='/register' className='NavItem' activeClassName='active'>
                REGISTRARSE
            </NavLink>  }
             
        </nav>
        <div>
            <Socials color='dark'/>
        </div>
        
    </header>
    
    
)
    
    }
export default Header;