import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserCircle,faSignOutAlt, faUserPlus, faSignInAlt  } from '@fortawesome/free-solid-svg-icons'
import { useSelector } from 'react-redux'
import Auxilary from '../../../hoc/Auxilary/Auxiliary'
import { Link } from 'react-router-dom'
import './ProfileHeader.css'
const ProfileHeader = () =>{ 
    const isAdmin = useSelector(state => state.auth.isAdmin)
    const isLogged = useSelector(state => state.auth.isLogged)
    const user = useSelector(state => state.auth.user)
    const isSuperAdmin = useSelector(state => state.auth.user)
    return(
        <Auxilary>
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
                                    </div>) 
                                    : <div className='profile-header-notlogged'>
                                        <Link to='/login'>
                                            <div className='profile-header-option'>
                                                <FontAwesomeIcon icon={faSignInAlt}/>
                                                <span>Iniciar Sesión</span>
                                            </div> 
                                        </Link>
                                        <Link to='/register'>
                                            <div className='profile-header-option'>
                                                <FontAwesomeIcon icon={faUserPlus}/>
                                                <span>Registrarse</span>
                                            </div>  
                                         </Link>
                                         
                                    </div>}
        </Auxilary>
    )
}

export default ProfileHeader;