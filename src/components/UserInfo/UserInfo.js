import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { withRouter } from 'react-router-dom'
import Loader from '../UI/Loader/Loader'
import Button from '../UI/Button/Button'
import { Field, Formik, Form } from 'formik'
import Message from '../UI/Message/Message'
import * as Yup from 'yup'
import styles from './UserInfo.module.css' 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserEdit } from '@fortawesome/free-solid-svg-icons'
const userInfoSchema = Yup.object({
    firstName: Yup.string().required('Nombre es obligatorio'),
    lastName: Yup.string().required('Apellido es obligatorio'),
    username: Yup.string().required('Usuario es obligatorio'),
    email: Yup.string().email('Correo no válido').required('Correo es obligatorio'),
    phoneNumber: Yup.string(),
    address: Yup.string().required('Dirección es obligatoria'),
})

const UserInfo = (props) => {
    const [user,setUser] = useState({})
    const [status,setStatus] = useState('LOADING')
    const [modify,setModify] = useState(false)
    const userID = props.match.params.userID

    const fetchUser = () =>{
        axios.get(`/users/${userID}`)
            .then(res=>{
                setUser(res.data)
                setStatus('SUCCESS')
            })
            .catch(err=>{
                console.log(err);
                setStatus('FAIL')
            })
    }



    const updateUserInfo = (values) =>{
        axios.patch(`/users/${userID}`,values)
            .then(res=>{
                setUser(res.data)
                setStatus('SUCCESS')
                setModify(!modify)
            })
            .catch(err=>{
                setStatus('FAIL')
                console.log(err)
            })
    }

    useEffect( ()=>{
        fetchUser()
    },[])


    let toRender = null 

    switch(status){
        case 'LOADING':
            toRender = <Loader/>
            break;
        case 'SUCCESS':
            toRender = 
            <Formik
            enableReinitialize={true}
            initialValues={{...user}}
            validationSchema={userInfoSchema}
            onSubmit = {(values) =>{
                updateUserInfo(values)
            }}
            >
            {({touched, errors, dirty, isValid,handleChange,values}) => (
            <Form className={styles.userInfoForm}>
                <div className={styles.titleContainer}>
                    <h1>Información de usuario</h1>
                    <FontAwesomeIcon title='Editar información' icon={faUserEdit} size='2x' className={styles.iconClickable} onClick={() =>{setModify(!modify)}}></FontAwesomeIcon>
                </div>
                
                <div className={styles.infoContainer}>
                <div className={styles.infoSubContainer}>
                    <label className={styles.formLabel} htmlFor='firstName'>Nombre</label>
                    <Field type='text' name='firstName' id='firstName' placeholder='Nombre' className={styles.formControl} disabled={!modify}/>
                    <label className={styles.formLabel} htmlFor='lastName'>Apellido</label>
                    <Field type='text' name='lastName' id='lastName' placeholder='Apellido ' className={styles.formControl} disabled={!modify}/>
                    <label className={styles.formLabel} htmlFor='username'>Usuario</label>
                    <Field type='text' name='username' id='username' placeholder='Usuario ' className={styles.formControl} disabled/>
                    <label className={styles.formLabel} htmlFor='status'>Status</label>
                    <Field type='text' name='status' id='status' placeholder='Status ' className={styles.formControl} disabled/>
                </div>
                <div className={styles.infoSubContainer}>
                    <label className={styles.formLabel} htmlFor='email'>Correo</label>
                    <Field type='email' name='email' id='email' placeholder='Correo ' className={styles.formControl} disabled={!modify}/>
                    <label className={styles.formLabel} htmlFor='phoneNumber'>Celular</label>
                    <Field type='text' name='phoneNumber' id='phoneNumber' placeholder='Celular ' className={styles.formControl} disabled={!modify}/>
                    <label className={styles.formLabel} htmlFor='address'>Dirección</label>
                    <Field type='text' name='address' id='address' placeholder='Dirección ' className={styles.formControl} disabled={!modify}/>
                    <label className={styles.formLabel} htmlFor='referredBy'>Referido por</label>
                    <Field type='text' name='referredBy' id='referredBy' placeholder='' className={styles.formControl} disabled={!modify}/>
                </div>

           
                </div>
                <div className={styles.buttonsContainer}>
                    <Button class={`Normal ${modify ? styles.buttonShow : styles.buttonHidden}`} type="submit" disabled={!dirty || !isValid}>Actualizar</Button>
                    <Button class={`Normal ${modify ? styles.buttonShow : styles.buttonHidden}`} type="button" onClick={() =>{setModify(!modify)}}>Cancelar</Button>
                </div>
                
            </Form>
            )}</Formik>
            break;
        case 'FAIL':
            toRender= <Message class='Error-msg' message='Hubo un error, intentalo más tarde'/>
            break;
    }

    return(
        <div className={styles.userInfo}>
            {toRender}
        </div>
    )
}

export default withRouter(UserInfo);