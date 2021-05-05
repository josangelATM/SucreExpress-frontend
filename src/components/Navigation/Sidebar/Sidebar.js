import React, {useState} from 'react'
import { useSelector } from 'react-redux'
import compStyles from './Sidebar.module.css'
import { NavLink } from 'react-router-dom'
import Auxiliary from '../../../hoc/Auxiliary/Auxiliary'
import { faChevronCircleDown, faChevronDown } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import SideBarButton from '../../UI/Button/SideBarButton/SideBarButton'
const Sidebar = (props) => {

    const isAdmin = useSelector(state => state.auth.isAdmin)
    const isLogged = useSelector(state => state.auth.isLogged)

    const adminLinks = 
        <Auxiliary>
            <div className='NavItem' >
                <div className={compStyles.navItem}>
                    <span>
                        PAQUETES
                    </span>
                    <FontAwesomeIcon icon={faChevronDown} size='1x'/>
                </div>
                <div className='dropdown-content'>
                    <NavLink onClick={props.toggle} className={compStyles.navItem} activeClassName='active' to='/packages/add'>
                        Registrar
                    </NavLink>
                    <NavLink onClick={props.toggle} className={compStyles.navItem} activeClassName='active' to='/packages/search'>
                        Buscar
                    </NavLink>
                </div>
            </div>
            
            <div className='NavItem'>
                <div className={compStyles.navItem}>
                    <span>
                        COTIZACIONES
                    </span>
                    <FontAwesomeIcon icon={faChevronDown} size='1x'/>
                </div>
                <div className='dropdown-content'>
                    <NavLink onClick={props.toggle} className={compStyles.navItem} activeClassName='active' to='/quotations/add'>
                        Solicitar
                    </NavLink>
                    <NavLink onClick={props.toggle} className={compStyles.navItem} activeClassName='active' to='/quotations/search'>
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
                    <NavLink onClick={props.toggle} className={compStyles.navItem} activeClassName='active' to='/users/add'>
                        Registrar
                    </NavLink>
                    <NavLink onClick={props.toggle} className={compStyles.navItem} activeClassName='active' to='/users/search'>
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
                    <NavLink onClick={props.toggle} className={compStyles.navItem} activeClassName='active' to='/bill/upload'>
                        Subir
                    </NavLink>
                    <NavLink onClick={props.toggle} className={compStyles.navItem} activeClassName='active' to='/bill/search'>
                        Buscar
                    </NavLink>
                </div>
            </div>
            <div className='NavItem'>
            <NavLink onClick={props.toggle} className={compStyles.navItem} exact to='/requests' activeClassName='active'>
                SOLICITUDES
            </NavLink>  
            </div>
            
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
                <NavLink onClick={props.toggle} className={compStyles.navItem} activeClassName='active' to='/packages/'>
                    Mis paquetes
                </NavLink>
                <NavLink onClick={props.toggle} className={compStyles.navItem} activeClassName='active' to='/packages/search'>
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
            <NavLink onClick={props.toggle} className={compStyles.navItem} activeClassName='active'to='/quotations'>
                    Mis cotizaciones
                </NavLink>
                <NavLink onClick={props.toggle} className={compStyles.navItem} activeClassName='active' to='/quotations/add'>
                    Solicitar
                </NavLink>
            </div>
        </div>
        <div className='NavItem'>
                <NavLink onClick={props.toggle} onClick={props.toggle} className={compStyles.navItem} exact to='/bill' activeClassName='active'>
                        FACTURAS
                </NavLink>
        </div>
        
    </Auxiliary>


    return(
        <div className={`${compStyles.sidebar} ${props.show ? compStyles.show : compStyles.hide}`}>
            <SideBarButton toOpen={false} toggle={props.toggle}/>
            { isLogged ? (isAdmin ? adminLinks : customerLinks) : customerLinks}
        </div>
    )
}

export default Sidebar;