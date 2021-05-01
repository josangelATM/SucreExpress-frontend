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
import formsStyles from '../../assets/Shared/Forms.module.css'
import compStyles from './Register.module.css'
import Modal from '../../components/UI/Modal/Modal'
import ModalContent from '../../components/UI/Modal/ModalContent/ModalContent'

const registerSchema = Yup.object({
    firstName: Yup.string().required('Nombre es obligatorio'),
    lastName: Yup.string().required('Apellido es obligatorio'),
    username: Yup.string().required('Usuario es obligatorio'),
    email: Yup.string().email('Correo no válido').required('Correo es obligatorio'),
    phoneNumber: Yup.string(),
    id: Yup.string().required('Cédula es obligatoria').matches(/^[a-zA-Z0-9]+$/,'Cédula sin guiones'),
    address: Yup.string().required('Dirección es obligatoria'),
    password: Yup.string().required('Contraseña es obligatorio'),
    confirmPassword : Yup.string().oneOf([Yup.ref('password'), null],'Las contraseñas deben coincidir').required('Confirmar contraseña es obligatorio'),
    comments: Yup.string()
})



class Register extends Component{
    state = {
        status: 'REGISTER',
        serverRes: ''
    }
    
    initialValues = {
        firstName:'',
        lastName:'',
        username:'',
        email:'',
        phoneNumber:'',
        id:'',
        address:'',
        password:'',
        confirmPassword:'',
        comments:''
    }
   
    handleSubmit = (values) =>{
        let data = {...values}
        this.setState({status:'LOADING'})
        data.id = data.id + '-PN'
        data.status = this.props.isAdmin ? 'active' : 'pending'
        axios.post('/users/register',data)
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
        enableReinitialize = {true}
        initialValues={this.initialValues}
        validationSchema={registerSchema}
        onSubmit={(values, {resetForm}) =>{
            this.handleSubmit(values)
            if(this.state.status ==='SUCCESS'){
                resetForm()
            }
        }}
    >
        {({touched, errors, dirty, isValid,handleChange,values}) => (
                <Form className={`form ${compStyles.registerMobile}`}>
                <h1>Crear cuenta</h1>
                <span>Campos obligatorios marcados en rojo</span>
                <div className='name-inputs'>
                    <Field type='text' placeholder='Nombre' name='firstName' 
                    className={`${formsStyles.normalField} ${formsStyles.requiredField} ${compStyles.field}`}></Field>
                    <Field type='text' placeholder='Apellido' name='lastName'
                    className={`${formsStyles.normalField} ${formsStyles.requiredField} ${compStyles.field}`}></Field>
                </div>
                <Field type='text' placeholder='Usuario' name='username'
                className={`${formsStyles.normalField} ${formsStyles.requiredField} ${compStyles.field}`}></Field>
                <Field type='email' placeholder='Correo' name='email' 
                className={`${formsStyles.normalField} ${formsStyles.requiredField} ${compStyles.field}`}></Field>
                <Field type='tel' placeholder='Celular' name='phoneNumber'
                className={`${formsStyles.normalField} ${formsStyles.requiredField} ${compStyles.field}`}></Field>
                <Field type='text' placeholder='Cédula (sin guiones)' name='id'
                className={`${formsStyles.normalField} ${formsStyles.requiredField} ${compStyles.field}`}></Field>
                <Field type='text' placeholder='Dirección' name='address'
                className={`${formsStyles.normalField} ${formsStyles.requiredField} ${compStyles.field}`}></Field>
                <Field type="password" placeholder="Contraseña" name='password' 
                className={`${formsStyles.normalField} ${formsStyles.requiredField} ${compStyles.field}`}></Field>
                <Field type="password" placeholder="Confirmar contraseña" name='confirmPassword' 
                className={`${formsStyles.normalField} ${formsStyles.requiredField} ${compStyles.field}`}></Field>
                {this.props.isSuperAdmin ? 
                <select name='type' onChange={handleChange} value={values.type} className={`${formsStyles.normalField} ${formsStyles.requiredField} ${compStyles.field}`}>
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
                toRender = 
                <Auxiliary>
                    <Loader hidden={true}></Loader>
                    {form}          
                </Auxiliary>
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