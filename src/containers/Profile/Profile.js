import React, { Component } from 'react'
import UserInfo from '../../components/UserInfo/UserInfo'
import PasswordChange from '../../components/User/PasswordChange/PasswordChange'
import { Redirect, withRouter } from 'react-router-dom'
import styles from './Profile.module.css'
import Auxiliary from '../../hoc/Auxiliary/Auxiliary'
import PasswordChangeRecover from '../PasswordChangeRecover/PasswordChangeRecover'

class Profile extends Component{
    render(){
        const userID= this.props.userID;
        const userIDURL = this.props.match.params.userID;
        const authorized = userID === userIDURL ? true : false
        
        let toRender = authorized || this.props.isAdmin ? <div className={styles.profile}>
        <UserInfo/>
        { this.props.isAdmin ? <PasswordChangeRecover isAdmin={this.props.isAdmin}/> : <PasswordChange/>}
    </div> : <Redirect to='/unathorized'/>

        return(
            <Auxiliary>
                {toRender}
            </Auxiliary> 
        )
    }
}

export default withRouter(Profile);