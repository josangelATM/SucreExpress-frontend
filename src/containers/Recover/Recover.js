import React, { Component } from 'react'
import Button from '../../components/UI/Button/Button'
import axios from 'axios' 
import { Formik, Form, Field } from "formik";
import * as Yup from 'yup'
import Auxiliary from '../../hoc/Auxiliary/Auxiliary';
import Loader from '../../components/UI/Loader/Loader';
import Message from '../../components/UI/Message/Message';
import { Link } from 'react-router-dom';
class Recover extends Component{
    state = {
        status: 'BEFORE',
        serverRes: ''
    }

    handleSubmit = values => {
        this.setState({status:'LOADING'})
        axios.post('/users/password',values)
            .then(res =>{
                this.setState({status:'SUCCESS'})
            })
            .catch(err =>{
                this.setState({status:'FAIL'})
                if(err.response.data==='Correo no registrado'){
                    this.setState({serverRes:err.response.data})
                }else{
                    this.setState({serverRes:'Ha ocurrido un error, intentalo más tarde'})
                }
                

            })
            

    }

    render() {
        let recoverForm = <Formik
        initialValues={{email:''}}
        validationSchema={Yup.object({
            email: Yup.string().required('email es obligatorio')})}
        onSubmit={(values)=>{
            this.handleSubmit(values)
        }}
    >
        {({touched, errors, dirty, isValid}) => (
            <Form className='form'>
                <h1>Recuperar contraseña</h1>
                <Field type='text' placeholder='Correo' name='email' className={'form-control'}></Field>
                <Button class={'Normal'} type="submit" disabled={!dirty || !isValid}>Enviar correo</Button>

            </Form>
        )}
    </Formik>
        let toRender = null
        switch(this.state.status){
            case 'BEFORE':
                toRender = 
                <Auxiliary>
                    {recoverForm}
                </Auxiliary>
                break;
            case 'LOADING':
                toRender = <Auxiliary>
                    <Loader/>
                    {recoverForm}
                </Auxiliary>
                break;
            case 'SUCCESS':
                toRender = <Auxiliary>
                    <Message class='Normal-msg' message='Enlace de recuperación enviado a tu correo'/>
                    <Button class='Normal'><Link to='/login'>Iniciar Sesión</Link></Button>
                </Auxiliary>
                break;
            case 'FAIL':
                toRender = 
                <Auxiliary>
                    <Message class='Error-msg' message={this.state.serverRes}/>
                    {recoverForm}
                </Auxiliary>
                break;
            
        }
        return(
            <Auxiliary>
                {toRender}
            </Auxiliary>
        )
    }
}

export default Recover;