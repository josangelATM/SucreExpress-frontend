import React, { Component } from 'react'
import Button from '../../components/UI/Button/Button'
import axios from 'axios' 
class Recover extends Component{

    handleSubmit = e => {
        e.preventDefault()
        const email = {email:e.target.elements.email.value}
        
        axios.post('http://localhost:5000/recover',email)
            .then(res =>{
                console.log(res);
            })
            .catch(err =>{
                console.log(err.response);
            })
            

    }

    render() {
        return(
            <form onSubmit={this.handleSubmit}>
               <input required type='email' placeholder='Introduzca su email' name='email'></input>
               <Button class='Normal'>Recuperar password</Button>
            </form>
        )
    }
}

export default Recover;