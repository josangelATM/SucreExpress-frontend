import React from 'react'
import axios from 'axios'
import Button from '../../components/UI/Button/Button'
import { withRouter } from 'react-router'
const PasswordChange = (props) => {

    const handleSubmit = e =>{
        e.preventDefault()
        const pwd = {pwd:e.target.elements.password.value}
        const id = props.match.params.userID;
        const code = props.match.params.code;
        
        axios.post(`/recover/${id}/${code}`,pwd)
            .then(res =>{
                console.log(res);
            })
            .catch(err =>{
                console.log(err.response);
            })
    }

    return(
        <form onSubmit={handleSubmit}>
               <input type='password' placeholder='Nueva contraseña' name='password'></input>
               <input type='password' placeholder='Confirmar contraseña'></input>
               <Button class='Normal'>Cambiar Password</Button>
        </form>
    )
}

export default withRouter(PasswordChange);