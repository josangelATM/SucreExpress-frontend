import React, {useState} from 'react'
import './Header.css'
import { Link, NavLink } from 'react-router-dom'
import { useSelector } from 'react-redux'
import Logo from '../../Logo/Logo'
import Auxiliary from '../../../hoc/Auxiliary/Auxiliary'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronDown } from '@fortawesome/free-solid-svg-icons'
import ProfileHeader from '../ProfileHeader/ProfileHeader'
import Sidebar from '../Sidebar/Sidebar'
import SideBarButton from '../../UI/Button/SideBarButton/SideBarButton'

const Header = () =>{
    
    const isAdmin = useSelector(state => state.auth.isAdmin)
    const isLogged = useSelector(state => state.auth.isLogged)
    const user = useSelector(state => state.auth.user)
    const [showSideBar,setShowSideBar] = useState(false) 

    const toggleSideBar = () =>{
        setShowSideBar(!showSideBar)
    }

    const adminLinks = 
        <Auxiliary>
            <div className='NavItem' activeClassName='active'>
                <div className='NavItem-title'>
                    <span>
                        PAQUETES
                    </span>
                    <FontAwesomeIcon icon={faChevronDown} size='1x'/>
                </div>
                <div className='dropdown-content'>
                    <NavLink to='/packages/add'>
                        Registrar
                    </NavLink>
                    <NavLink to='/packages/search'>
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
                    <NavLink to='/quotations/add'>
                        Solicitar
                    </NavLink>
                    <NavLink to='/quotations/search'>
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
            <div className='NavItem' activeClassName='active'>
                 <div className='NavItem-title'>
                    <span>
                        FACTURAS
                    </span>
                    <FontAwesomeIcon icon={faChevronDown} size='1x'/>
                </div>
                <div className='dropdown-content'>
                    <NavLink to='/bills/upload'>
                        Subir
                    </NavLink>
                    <NavLink to='/bills/generator'>
                        Generar
                    </NavLink>
                    <NavLink to='/bills/search'>
                        Buscar
                    </NavLink>
                </div>
            </div>
            <NavLink exact to='/requests' className='NavItem NavItem-title' activeClassName='active'>
                SOLICITUDES
            </NavLink>
        </Auxiliary>

    const customerLinks = 
        <Auxiliary>
        <div className='NavItem' activeClassName='active'>
            <div className='NavItem-title'>
                    <span>
                        PAQUETES
                    </span>
                    <FontAwesomeIcon icon={faChevronDown} size='1x'/>
            </div>
            <div className='dropdown-content'>
                <NavLink to='/packages/'>
                    Mis paquetes
                </NavLink>
                <NavLink to='/packages/search'>
                    Buscar
                </NavLink>
                { user && user.hasReferrals ? 
                <NavLink to='/packages/referrals'>
                    Referidos
                </NavLink>: null }
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
            <NavLink to='/quotations'>
                    Mis cotizaciones
                </NavLink>
                <NavLink to='/quotations/add'>
                    Solicitar
                </NavLink>
            </div>
        </div>
        <NavLink exact to='/bills' className='NavItem NavItem-title' activeClassName='active'>
                FACTURAS
        </NavLink>
    </Auxiliary>
 
    return(
    <header className='Header'>
        <SideBarButton toggle={toggleSideBar} toOpen={true}/>
        <Sidebar show={showSideBar}  toggle={toggleSideBar}/>
        <Link to='/home'>
        <div className='logo-navbar'>
            <Logo/>
        </div>
        </Link>
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