import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { Component } from 'react' 
import Logo from '../../components/Logo/Logo'
import { connect } from 'react-redux'
import compStyles from './LandingPage.module.css'
import {faBoxOpen, faMoneyCheck,faFileInvoiceDollar, faUsers, faTasks} from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'
class LandingPage extends Component {
    

    render() {
        const iconSize = '10x'
    
        return(
            <div className={compStyles.landingPage}>
                {this.props.isAdmin ? null : <div className={compStyles.logoContainer}>
                    <Logo/>
                </div>}
                
                <div className={compStyles.buttonsContainer}>
                    <Link to='/packages'>
                        <div className={compStyles.iconContainer}>
                            <FontAwesomeIcon className={compStyles.icon} icon={faBoxOpen} size={iconSize}/>
                            <p>PAQUETES</p>
                        </div>
                    </Link>
                    <Link to='/quotations'>
                        <div className={compStyles.iconContainer}>
                            <FontAwesomeIcon className={compStyles.icon} icon={faMoneyCheck} size={iconSize}/>
                            <p>COTIZACIONES</p>
                        </div >
                    </Link>
                    <Link to='/bills'>
                        <div className={compStyles.iconContainer}>
                            <FontAwesomeIcon className={compStyles.icon} icon={faFileInvoiceDollar} size={iconSize}/>
                            <p>FACTURAS</p>
                        </div>
                    </Link>
                    
                </div>
                { this.props.isAdmin ? <div className={compStyles.buttonsContainer}>
                    <Link to='/users'>
                        <div className={compStyles.iconContainer}>
                            <FontAwesomeIcon className={compStyles.icon} icon={faUsers} size={iconSize}/>
                            <p>USUARIOS</p>
                        </div>
                    </Link>
                    <Link to='/requests'>
                        <div className={compStyles.iconContainer}>
                            <FontAwesomeIcon className={compStyles.icon} icon={faTasks} size={iconSize}/>
                            <p>SOLICITUDES</p>
                        </div >
                    </Link>
                </div> : null}


            </div>
        )
    }
}


const mapStateToProps = state => {
    return{
        isAdmin: state.auth.isAdmin
    }
}

export default connect(mapStateToProps,null)(LandingPage);