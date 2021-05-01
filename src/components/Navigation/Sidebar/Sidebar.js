import React, {useState} from 'react'
import { useSelector } from 'react-redux'
import compStyles from './Sidebar.module.css'
import { NavLink } from 'react-router-dom'
import Auxiliary from '../../../hoc/Auxiliary/Auxiliary'
import { faChevronCircleDown, faChevronDown } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
const Sidebar = (props) => {

    const isAdmin = useSelector(state => state.auth.isAdmin)
    const isLogged = useSelector(state => state.auth.isLogged)

    const adminLinks = 
        <Auxiliary>
            <div className={compStyles.navItem} activeClassName='active'>
                <div className={compStyles.navItem}>
                    <span>
                        PAQUETES
                    </span>
                    <FontAwesomeIcon icon={faChevronDown} size='1x'/>
                </div>
                <div className='dropdown-content'>
                    <NavLink className={compStyles.navItem} activeClassName='active' to='/packages/add'>
                        Registrar
                    </NavLink>
                    <NavLink className={compStyles.navItem} activeClassName='active' to='/packages/search'>
                        Buscar
                    </NavLink>
                </div>
            </div>
            
            <div className={compStyles.navItem} activeClassName='active'>
                <div className={compStyles.navItem}>
                    <span>
                        COTIZACIONES
                    </span>
                    <FontAwesomeIcon icon={faChevronDown} size='1x'/>
                </div>
                <div className='dropdown-content'>
                    <NavLink className={compStyles.navItem} activeClassName='active' to='/quotation/add'>
                        Solicitar
                    </NavLink>
                    <NavLink className={compStyles.navItem} activeClassName='active' to='/quotation/search'>
                        Buscar
                    </NavLink>
                </div>
            </div>
            <div className='NavItem' >
                 <div className={compStyles.navItem}>
                    <span>
                        USUARIOS
                    </span>
                    <FontAwesomeIcon icon={faChevronDown} size='1x'/>
                </div>
                <div className='dropdown-content'>
                    <NavLink className={compStyles.navItem} activeClassName='active' to='/users/add'>
                        Registrar
                    </NavLink>
                    <NavLink className={compStyles.navItem} activeClassName='active' to='/users/search'>
                        Buscar
                    </NavLink>
                </div>
            </div>
            <div className='NavItem' >
                 <div className={compStyles.navItem}>
                    <span>
                        FACTURAS
                    </span>
                    <FontAwesomeIcon icon={faChevronDown} size='1x'/>
                </div>
                <div className='dropdown-content'>
                    <NavLink className={compStyles.navItem} activeClassName='active' to='/bill/upload'>
                        Subir
                    </NavLink>
                    <NavLink className={compStyles.navItem} activeClassName='active' to='/bill/search'>
                        Buscar
                    </NavLink>
                </div>
            </div>
            <NavLink className={compStyles.navItem} exact to='/request' activeClassName='active'>
                SOLICITUDES
            </NavLink>
        </Auxiliary>

    const customerLinks = 
        <Auxiliary>
        <div className='NavItem' >
            <div className={compStyles.navItem}>
                    <span>
                        PAQUETES
                    </span>
                    <FontAwesomeIcon icon={faChevronDown} size='1x'/>
            </div>
            <div className='dropdown-content'>
                <NavLink className={compStyles.navItem} activeClassName='active' to='/packages/'>
                    Mis paquetes
                </NavLink>
                <NavLink className={compStyles.navItem} activeClassName='active' to='/packages/search'>
                    Buscar
                </NavLink>
            </div>
        </div>
        
        <div className='NavItem' activeClassName='active'>
            <div className={compStyles.navItem}>
                    <span>
                        COTIZACIONES
                    </span>
                    <FontAwesomeIcon icon={faChevronDown} size='1x'/>
            </div>
            <div className='dropdown-content'>
            <NavLink className={compStyles.navItem} activeClassName='active'to='/quotation'>
                    Mis cotizaciones
                </NavLink>
                <NavLink className={compStyles.navItem} activeClassName='active' to='/quotation/add'>
                    Solicitar
                </NavLink>
            </div>
        </div>
        <div className='NavItem'>
                <NavLink className={compStyles.navItem} exact to='/bill' activeClassName='active'>
                        FACTURAS
                </NavLink>
        </div>
        
    </Auxiliary>


    return(
        <div className={`${compStyles.sidebar} ${props.show ? compStyles.show : compStyles.hide}`}>
            { isLogged ? (isAdmin ? adminLinks : customerLinks) : customerLinks}
        </div>
    )
}

export default Sidebar;