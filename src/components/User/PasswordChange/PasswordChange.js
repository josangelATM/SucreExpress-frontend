import React, { useState } from 'react'
import axios from 'axios'
import { withRouter } from 'react-router-dom'
import Loader from '../../UI/Loader/Loader'
import Message from '../../UI/Message/Message'
import * as Yup from 'yup'
import { Field, Formik, Form } from 'formik'
import styles from './PasswordChange.module.css'
import Button from '../../UI/Button/Button'
const passwordSchema = Yup.object({
    currentPassword: Yup.string().required('Contraseña actual requerida'),
    newPassword: Yup.string().required('Contraseña nueva requerida'),
    passwordConfirmation: Yup.string().oneOf([Yup.ref('newPassword'), null], 'Contraseñas deben coincidir')
})
const initialValues = {
    currentPassword:'',
    newPassword:'',
    passwordConfirmation:''
}

const PasswordChange = (props) =>{
    const userID = props.match.params.userID
    const [status,setStatus] = useState('BEFORE')
    const changePassword = (values) =>{
        setStatus('LOADING')
        axios.patch(`/users/${userID}/password`,values)
            .then(res=>{
                setStatus('SUCCESS')
            })
            .catch(err=>{
                setStatus('FAIL')
            })
    }
    let toRender = null
    switch(status){
        case 'BEFORE':
            toRender =
            <Formik
                initialValues={initialValues}
                validationSchema={passwordSchema}
                onSubmit={values =>{
                    changePassword(values)
                }}
            >
                {({touched, errors, dirty, isValid,handleChange,values}) => (
                        <Form className='form no-border'>
                        <h1 className={styles.title}>Cambiar contraseña</h1>
                        <Field type='text' name='currentPassword' placeholder='Contraseña actual' className='form-control' />
                        <Field type='text' name='newPassword' placeholder='Contraseña nueva' className='form-control' />
                        <Field type='text' name='passwordConfirmation' placeholder='Confirmar contraseña' className='form-control'/>
                        <Button class={'Normal'} type="submit" disabled={!dirty || !isValid}>Cambiar</Button>
                        </Form>
                )}

            </Formik>
            break;
        case 'LOADING':
            toRender = <Loader/>
            break;
        case 'SUCCESS':
            toRender = <Message class='Normal-msg' message='Contrañesa actualizada'/>
            break;
        case 'FAIL':
            toRender = <Message class='Error-msg' message='Hubo un error, intentalo más tarde'/>
            break;
    }

    return(
        <div className={styles.changePasswordContainer}>
            {toRender}
        </div>
    )
}

export default withRouter(PasswordChange);