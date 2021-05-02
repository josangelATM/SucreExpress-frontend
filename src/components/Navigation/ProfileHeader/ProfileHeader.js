import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserCircle,faSignOutAlt, faUserPlus, faSignInAlt  } from '@fortawesome/free-solid-svg-icons'
import { useSelector } from 'react-redux'
import Auxiliary from '../../../hoc/Auxiliary/Auxiliary'
import { Link } from 'react-router-dom'
import './ProfileHeader.css'
const ProfileHeader = () =>{ 
    const isAdmin = useSelector(state => state.auth.isAdmin)
    const isLogged = useSelector(state => state.auth.isLogged)
    const user = useSelector(state => state.auth.user)
    const isSuperAdmin = useSelector(state => state.auth.isSuperAdmin )
    return(
        <Auxiliary>
            { isLogged ? (isAdmin || isSuperAdmin ?  <div className='profile-header'>
                                        <div className='profile-icons'>
                                            <Link to='/profile' title='Perfil'><FontAwesomeIcon icon={faUserCircle} size='3x'/></Link>
                                            <Link to='/logout' title='Cerrar sesión'><FontAwesomeIcon icon={faSignOutAlt} size='3x'/></Link>
                                        </div>
                                        <span>{`${user.firstName} ${user.lastName}`}</span>
                                        <span>{user.type}</span>
                                        
                                    </div>
                                    : <div className='profile-header'>
                                        <div className='profile-icons'>
                                        <Link to='/profile' title='Perfil'><FontAwesomeIcon icon={faUserCircle} size='3x'/></Link>
                                            <Link to='/logout' title='Cerrar sesión'><FontAwesomeIcon icon={faSignOutAlt} size='3x'/></Link>
                                        </div>
                                        <span>{`${user.firstName} ${user.lastName}`}</span>
                                        <span>{user.id}</span>
                                    </div>) 
                                    : <div className='profile-header-notlogged'>
                                        <Link to='/login'>
                                            <div className='profile-header-option'>
                                                <FontAwesomeIcon icon={faSignInAlt}/>
                                                <p>Iniciar Sesión</p>
                                                
                                            </div> 
                                        </Link>
                                        <Link to='/register'>
                                            <div className='profile-header-option'>
                                                <FontAwesomeIcon icon={faUserPlus}/>
                                                <p>Registrarse</p>
                                            </div>  
                                         </Link>
                                         
                                    </div>}
        </Auxiliary>
    )
}

export default ProfileHeader;