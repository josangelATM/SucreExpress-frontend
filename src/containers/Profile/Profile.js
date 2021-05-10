import React, { Component } from 'react'
import UserInfo from '../../components/UserInfo/UserInfo'
import PasswordChange from '../../components/User/PasswordChange/PasswordChange'
import { Redirect, withRouter } from 'react-router-dom'
import styles from './Profile.module.css'
import Auxiliary from '../../hoc/Auxiliary/Auxiliary'
import PasswordChangeRecover from '../PasswordChangeRecover/PasswordChangeRecover'
import Button from '../../components/UI/Button/Button'
import axios from 'axios'
import Loader from '../../components/UI/Loader/Loader'
import Message from '../../components/UI/Message/Message'
class Profile extends Component{

    userID= this.props.userID;
    userIDURL = this.props.match.params.userID;
    authorized = this.userID === this.userIDURL ? true : false

    
    render(){
        

        let toRender = this.authorized || this.props.isAdmin ? 
        <div className={styles.profile}>
        <div className={styles.upContainer}>
            <UserInfo/>
            { this.props.isAdmin ? <PasswordChangeRecover isAdmin={this.props.isAdmin}/> : <PasswordChange/>}
        </div>
        </div> :
    <Redirect to='/unathorized'/>

        return(
            <Auxiliary>
                {toRender}
            </Auxiliary> 
        )
    }
}

export default withRouter(Profile);