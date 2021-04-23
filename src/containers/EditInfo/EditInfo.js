import React from 'react'
import { withRouter } from 'react-router-dom';
import { useSelector } from 'react-redux'
import axios from 'axios'
import Button from '../../components/UI/Button/Button'
const EditInfo = (props) => {

    const user = useSelector(state => state.auth.user)


    const handleSubmit = e =>{
        e.preventDefault()
        let formData = new FormData(e.target)
        const value = Object.fromEntries(formData.entries());
        
        axios.post(`/user/edit/${user.id}`,value)
            .then(res =>{
                console.log(res);
            })
            .catch(err =>{
                console.log(err.response);
            })
    }
    return(
        <form onSubmit={handleSubmit}>
               <input type='text' placeholder={user.phoneNumber} name='phoneNumber'></input>
               <Button class='Normal'>Editar info</Button>
        </form>
    )
}

export default withRouter(EditInfo);