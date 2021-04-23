import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as Yup from 'yup'
import axios from 'axios'
import '../../assets/Shared/Forms.css'
import Auxiliary from '../../hoc/Auxiliary/Auxiliary'
import Message from '../../components/UI/Message/Message'
import Loader from '../../components/UI/Loader/Loader'
import Button from '../../components/UI/Button/Button'
import { Formik, Form, Field } from "formik";
import { Link } from 'react-router-dom'

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
        status: 'REGISTER',
        serverRes: ''
    }
    

    handleSubmit = (values) =>{
        this.setState({status:'LOADING'})
        values.id = values.id + '-PN'
        values.status = this.props.isAdmin ? 'active' : 'pending'
        axios.post('/users/register',values)
            .then(res =>  {
                this.setState({status:'SUCCESFUL',serverRes:res.data})
            })
            .catch(err => {
                this.setState({status:'FAILED'})
                if(err.response.data.name==='UserExistsError'){
                    this.setState({serverRes:'Nombre de usuario ya registrado'})
                }else if(err.response.data.code===11000 && err.response.data.keyPattern.id){
                    this.setState({serverRes:'Cédula ya registrada'})
                }else if(err.response.data.code===11000 && err.response.data.keyPattern.email){
                    this.setState({serverRes:'Correo ya registrado'})
                }else{
                    this.setState({serverRes:'Hubo un error, intentanlo más tarde'})
                }
               
            })
    }   


    render(){
        let toRender = null
        let form = <Formik
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
        switch(this.state.status){
            case 'REGISTER':
                toRender = form 
                break;
            case 'LOADING':
                toRender = 
                <Auxiliary>
                    <Loader></Loader>
                    {form}          
                </Auxiliary>
                break;
            case 'SUCCESFUL': 
                toRender = 
                <Auxiliary>
                    <Message class='Normal-msg' message={this.state.serverRes}/>
                    <Button class='Normal'><Link to='/login'>Iniciar Sesión</Link></Button>
                </Auxiliary>
                
                break;
            case 'FAILED': 
                toRender = 
                <Auxiliary>
                    <Message class='Error-msg' message={this.state.serverRes}/>
                    {form}
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

const mapStateToProps = state => {
    return{
        isAdmin: state.auth.isAdmin,
        isSuperAdmin: state.auth.isSuperAdmin
    }
}


export default connect(mapStateToProps,null)(Register);