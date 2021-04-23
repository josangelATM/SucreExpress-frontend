import React, { Component } from 'react'
import { withRouter } from 'react-router'
import { Link } from 'react-router-dom'
import axios from 'axios'
import Message from '../../components/UI/Message/Message'
import Loader from '../../components/UI/Loader/Loader'
import Auxiliary from '../../hoc/Auxiliary/Auxiliary'
import Button from '../../components/UI/Button/Button'

class Activate extends Component{
    state = {
        status : 'LOADING'
    }

    componentDidMount() {
        const id = this.props.match.params.userID;
        const code = this.props.match.params.code;

        axios.get(`users/activate/${id}/${code}`)
            .then(res => {
                
                this.setState({status: 'SUCCESS'})
            })
            .catch(err => {
                this.setState({status: 'FAIL'})
            })
    }

    render(){
        let message = null


        switch(this.state.status){
            case 'LOADING':
                message = <Loader/>
                break;
            case 'SUCCESS':
                message = 
                <Auxiliary>
                    <Message class='Normal-msg' message='Cuenta activada exitosamente'/>
                    <Button class='Normal'><Link to='/login'>Iniciar Sesión</Link></Button>
                </Auxiliary>
                break;
            case 'FAIL':
                message = 
                <Auxiliary>
                    <Message class='Error-msg' message='Enlace de activación expirado o no válido'/>
                </Auxiliary>
                break;
                
        }   

        

        return(
            <Auxiliary>
                {message}
            </Auxiliary>
        )
    }
}

export default withRouter(Activate);


