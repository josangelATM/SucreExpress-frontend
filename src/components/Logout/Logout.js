import React from 'react'
import Message from '../UI/Message/Message'
import { useDispatch } from 'react-redux'
import { logout } from '../../store/actions/index'

const Logout = () => {

    const dispatch = useDispatch()
    localStorage.removeItem('user')
    dispatch(logout())

    return(
        <Message class='Normal-msg' message='HASTA PRONTO!'>
                </Message>
    )
}

export default Logout;