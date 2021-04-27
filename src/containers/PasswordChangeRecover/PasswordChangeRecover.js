import React,{ useState } from 'react'
import axios from 'axios'
import Button from '../../components/UI/Button/Button'
import { withRouter } from 'react-router'
import * as Yup from 'yup'
import { Field, Formik, Form } from 'formik'
import Loader from '../../components/UI/Loader/Loader'
import Message from '../../components/UI/Message/Message'
import styles from '../../components/User/PasswordChange/PasswordChange.module.css'
const passwordSchema = Yup.object({
    newPassword: Yup.string().required('Contraseña nueva requerida'),
    passwordConfirmation: Yup.string().oneOf([Yup.ref('newPassword'), null], 'Contraseñas deben coincidir')
})
const initialValues = {
    newPassword:'',
    passwordConfirmation:''
}

const PasswordChange = (props) => {
    const [status,setStatus] = useState('BEFORE')
    const userID = props.match.params.userID;
    const code = props.match.params.code;
    
    const handleSubmit = values =>{   
        setStatus('LOADING')
        const url = props.isAdmin ? `/users/password/${userID}` : `/users/password/${userID}/${code}`
        axios.post(url,values)
            .then(res =>{
                setStatus('SUCCESS')
            })
            .catch(err =>{
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
                    handleSubmit(values)
                }}
            >
                {({touched, errors, dirty, isValid,handleChange,values}) => (
                        <Form className='form'>
                        <h1>Cambiar contraseña</h1>
                        <Field type='password' name='newPassword' placeholder='Contraseña nueva' className='form-control' />
                        <Field type='password' name='passwordConfirmation' placeholder='Confirmar contraseña' className='form-control'/>
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
    <div>
        {toRender}
    </div>
    )
}

export default withRouter(PasswordChange);






