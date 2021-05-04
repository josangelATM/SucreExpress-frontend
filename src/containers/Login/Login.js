import React, { Component } from 'react'
import axios from 'axios'
import '../../assets/Shared/Forms.css'
import Auxiliary from '../../hoc/Auxiliary/Auxiliary'
import Message from '../../components/UI/Message/Message'
import Loader from '../../components/UI/Loader/Loader'
import { login } from '../../store/actions/index'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import Button from '../../components/UI/Button/Button'
import { Link } from 'react-router-dom'
import * as Yup from 'yup'
import { Formik, Form, Field, ErrorMessage } from "formik";
import './Login.css'
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
        status: 'LOGIN',
        serverRes: '',
        showPassword: false
    }
    

    handleSubmit = values =>{
        console.log(values)
        this.setState({status:'LOADING'})
        axios.post('/users/login',values)
            .then(res =>  {
                this.props.login(res.data)
                localStorage.setItem('user', JSON.stringify(res.data))
                this.setState({status:'SUCCESFUL'})
            })
            .catch(err => {
                if(err.response && err.response.status===401){
                    this.setState({status:'FAILED',serverRes:'Usuario o contraseña incorrecta'})
                }else{
                    this.setState({status:'FAILED',serverRes:'Hubo un error, intentalo más tarde'})
                }
                

            })
    }   

    


    render(){
        let loginForm = <Formik
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
                <Field type={this.state.showPassword ? 'text' : 'password'} placeholder="Contraseña" name='password' 
                className={`form-control ${touched.password && errors.password ? 'error' : ''}`}></Field>
                <div className='showPasswordContainer' onClick={() => {this.setState({showPassword:!this.state.showPassword})}}> 
                <input type='checkbox' checked={this.state.showPassword}/>
                <label className={'showPassword'}>Mostrar contraseña</label>
                </div>
                
                <Button class={'Normal'} type="submit" disabled={!dirty || !isValid}>Iniciar sesión</Button>
                <Link to='/recover'>Olvidé mi password</Link>   
            </Form>
        )}
    </Formik>

    let toRender = null

        switch(this.state.status){
            case 'LOGIN':
                toRender = loginForm
                break;

            case 'LOADING':
                toRender =<Loader></Loader>
                break;
            case 'SUCCESFUL': 
                toRender = <Redirect to ='/packages' />
           
                break;
            case 'FAILED': 
                toRender = 
                <Auxiliary>
                    <Message class='Error-msg' message={this.state.serverRes}/>
                    {loginForm}
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


const mapDispatchToProps = (dispatch) => {
    return{
        login: (user) => dispatch(login(user))
    }
    
}

export default connect(null,mapDispatchToProps)(Login);