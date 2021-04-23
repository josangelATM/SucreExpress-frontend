import React, { Component } from 'react'
import UserInfo from '../../components/UserInfo/UserInfo'
import PasswordChange from '../../components/User/PasswordChange/PasswordChange'
import { Redirect, withRouter } from 'react-router-dom'
import styles from './Profile.module.css'
import Auxiliary from '../../hoc/Auxiliary/Auxiliary'

class Profile extends Component{
    render(){
        const userID= this.props.userID;
        const userIDURL = this.props.match.params.userID;
        const authorized = userID === userIDURL ? true : false

        console.log(authorized);
        console.log(this.props.isAdmin);
        
        let toRender = authorized || this.props.isAdmin ? <div className={styles.profile}>
        <UserInfo/>
        <PasswordChange/>
    </div> : <Redirect to='/unathorized'/>

        return(
            <Auxiliary>
                {toRender}
            </Auxiliary> 
        )
    }
}

export default withRouter(Profile);