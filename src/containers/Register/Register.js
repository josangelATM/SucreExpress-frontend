import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as Yup from 'yup'
import axios from 'axios'
import '../../assets/Shared/Forms.css'
import Auxilary from '../../hoc/Auxilary/Auxiliary'
import Message from '../../components/UI/Message/Message'
import Loader from '../../components/UI/Loader/Loader'
import Button from '../../components/UI/Button/Button'
import { Formik, Form, Field } from "formik";

const registerSchema = Yup.object({
    firstName: Yup.string().required('Nombre es obligatorio'),
    lastName: Yup.string().required('Apellido es obligatorio'),
    username: Yup.string().required('Usuario es obligatorio'),
    email: Yup.string().email('Correo no válido').required('Correo es obligatorio'),
    phoneNumber: Yup.string(),
    id: Yup.string().required('Cédula es obligatoria'),
    address: Yup.string().required('Dirección es obligatoria'),
    password: Yup.string().required('Contraseña es obligatorio'),
    confirmPassword : Yup.string().oneOf([Yup.ref('password'), null],'Las contraseñas deben coincidir').required('Confirmar contraseña es obligatorio')
})

const initialValues = {
    firstName:'',
    lastName:'',
    username:'',
    email:'',
    phoneNumber:'',
    id:'',
    address:'',
    password:'',
    confirmPassword:''
}


class Register extends Component{
    state = {
        status: 'REGISTER'
    }
    

    handleSubmit = (values) =>{
        this.setState({status:'LOADING'})
        values.id = values.id + '-PN'
        values.status = this.props.isAdmin ? 'active' : 'pending'
        axios.post('http://localhost:5000/register',values)
            .then(res =>  {
                this.setState({status:'SUCCESFUL'})
            })
            .catch(err => {
                this.setState({status:'FAILED'})
            })
    }   


    render(){
        let toRender = null
        switch(this.state.status){
            case 'REGISTER':
                toRender = 
                <Formik
                    initialValues={initialValues}
                    validationSchema={registerSchema}
                    onSubmit={values =>{
                        this.handleSubmit(values)
                    }}
                >
                    {({touched, errors, dirty, isValid,handleChange,values}) => (
                            <Form className='form'>
                            <h1>Crear cuenta</h1>
                            <div className='name-inputs'>
                                <Field type='text' placeholder='Nombre' name='firstName' 
                                className={`form-control ${touched.firstName && errors.firstName ? 'error' : ''}`}></Field>
                                <Field type='text' placeholder='Apellido' name='lastName'
                                className={`form-control ${touched.lastName && errors.lastName ? 'error' : ''}`}></Field>
                            </div>
                            <Field type='text' placeholder='Usuario' name='username'
                            className={`form-control ${touched.username && errors.username ? 'error' : ''}`}></Field>
                            <Field type='email' placeholder='Correo' name='email' 
                            className={`form-control ${touched.email && errors.email ? 'error' : ''}`}></Field>
                            <Field type='tel' placeholder='Télefono' name='phoneNumber'
                            className={`form-control ${touched.phoneNumber && errors.phoneNumber ? 'error' : ''}`}></Field>
                            <Field type='text' placeholder='Cédula (sin guiones)' name='id'
                            className={`form-control ${touched.id && errors.id ? 'error' : ''}`}></Field>
                            <Field type='text' placeholder='Dirección' name='address'
                            className={`form-control ${touched.address && errors.address ? 'error' : ''}`}></Field>
                            <Field type="password" placeholder="Contraseña" name='password' 
                            className={`form-control ${touched.password && errors.password ? 'error' : ''}`}></Field>
                            <Field type="password" placeholder="Confirmar contraseña" name='confirmPassword' 
                            className={`form-control ${touched.confirmPassword && errors.confirmPassword ? 'error' : ''}`}></Field>
                            {this.props.isSuperAdmin ? 
                            <select name='type' onChange={handleChange} value={values.type} class='form-control'>
                            <option hidden>Tipo de usuario</option>
                            <option value='customer'>Customer</option>
                            <option value='admin'>admin</option>
                            </select>
                        : null}
                            <div className='errors-container'>
                            {Object.keys(errors).map(key=>(
                                <span>{touched[key] ? `* ${errors[key]}` : null}</span>
                            ))}
                            </div>
                            <Button class={'Normal'} type="submit" disabled={!dirty || !isValid}>Registrar</Button>
                            </Form>
                    )}

                </Formik>
                break;

            case 'LOADING':
                toRender = <Loader></Loader>
                break;
            case 'SUCCESFUL': 
                toRender = <Message class='Normal-msg' message='CUENTA REGISTRADA, REVISA TU CORREO PARA ACTIVAR TU CUENTA'>
                </Message>
                break;
            case 'FAILED': 
                toRender = <Message class='Error-msg' message='Upss hubo un error'>
                </Message>
                break;
            default: 
                toRender = null
        }
        
        return(
            <Auxilary>
                {toRender}
            </Auxilary>
            )
    }
}

const mapStateToProps = state => {
    return{
        isAdmin: state.auth.isAdmin,
        isSuperAdmin: state.auth.isSuperAdmin
    }
}


export default connect(mapStateToProps,null)(Register);