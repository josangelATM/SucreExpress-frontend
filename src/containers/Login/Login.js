import React, { Component } from 'react'
import axios from 'axios'
import '../../assets/Shared/Forms.css'
import Auxilary from '../../hoc/Auxilary/Auxiliary'
import Message from '../../components/UI/Message/Message'
import Loader from '../../components/UI/Loader/Loader'
import { login } from '../../store/actions/index'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import Button from '../../components/UI/Button/Button'
import { Link } from 'react-router-dom'
import * as Yup from 'yup'
import { Formik, Form, Field, ErrorMessage } from "formik";

const loginSchema = Yup.object({
    username: Yup.string().required('Usuario es obligatorio'),
    password: Yup.string().required('Contraseña es obligatorio'),
})

const initialValues = {
    username:'',
    password:''
}

class Login extends Component{
    state = {
        status: 'LOGIN'
    }
    

    handleSubmit = values =>{
        this.setState({status:'LOADING'})
        axios.post('http://localhost:5000/login',values)
            .then(res =>  {
                this.props.login(res.data)
                localStorage.setItem('user', JSON.stringify(res.data))
                this.setState({status:'SUCCESFUL'})
            })
            .catch(err => {
                this.setState({status:'FAILED'})
            })
    }   

    


    render(){
        let form = null 

        switch(this.state.status){
            case 'LOGIN':
                form = 
                <Formik
                    initialValues={initialValues}
                    validationSchema={loginSchema}
                    onSubmit={(values)=>{
                        this.handleSubmit(values)
                    }}
                >
                    {({touched, errors, dirty, isValid}) => (
                        <Form className='form'>
                            <h1>Iniciar Sesión</h1>
                            <Field type='text' placeholder='Usuario' name='username' 
                            className={`form-control ${touched.username && errors.username ? 'error' : ''}`}></Field>
                            <Field type="password" placeholder="Contraseña" name='password' 
                            className={`form-control ${touched.password && errors.password ? 'error' : ''}`}></Field>
                            <Button class={'Normal'} type="submit" disabled={!dirty || !isValid}>Iniciar Sesión</Button>
                            <Link to='/recover'>Olvidé mi password</Link>   
                        </Form>
                    )}
                </Formik>
                break;

            case 'LOADING':
                form = <Loader></Loader>
                break;
            case 'SUCCESFUL': 
                form = <Redirect to ='/' />
           
                break;
            case 'FAILED': 
                form = <Message class='Error-msg' message='Upsss hubo un errror'>
                </Message>
                break;
            default: 
                form = null
        }
        
        return(
            <Auxilary>
                {form}
            </Auxilary>
            )
    }
}


const mapDispatchToProps = (dispatch) => {
    return{
        login: (user) => dispatch(login(user))
    }
    
}

export default connect(null,mapDispatchToProps)(Login);