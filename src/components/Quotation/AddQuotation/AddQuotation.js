import React, { useState } from 'react'
import axios from 'axios'
import * as Yup from 'yup'
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useSelector } from 'react-redux'
import Button from '../../UI/Button/Button'
import Auxiliary from '../../../hoc/Auxiliary/Auxiliary'
import Loader from '../../UI/Loader/Loader'
import Message from '../../UI/Message/Message'
import { Link } from 'react-router-dom';
import styles from './AddQuotation.module.css'

const quotationSchema = Yup.object({
    originCountry: Yup.string(),
    destinationCountry: Yup.string(),
    weight: Yup.string(),
    links: Yup.string(),
    email: Yup.string(),
    phoneNumber: Yup.string(),
    qtyBultos: Yup.string(),
    cubicMeters: Yup.string(),
    cubicFeets: Yup.string(),
    message: Yup.string(),
    contactMethod: Yup.string()
})

const AddQuotation = () => {
    const [status,setStatus] = useState('BEFORE') 
    const user = useSelector(state => state.auth.user) 
    const initialValues = {
        customerID: user.id,
        email: user.email,
        phoneNumber: user.phoneNumber,
        originCountry:'',
        destinationCountry:'',
        qtyBultos:'',
        weight:'',
        cubicMeters:'',
        cubicFeets:'',
        message:'',
        links:'',
        contactMethod:''
      }
    const handleSubmit = values => {
        setStatus('LOADING')
        values.links = values.links.split(',').map(link => link.trim())
        axios.post('/quotation/add',values)
            .then(res=>{
                setStatus('SUCCESS')
            })
            .catch(err=>{
                setStatus('FAIL')
            })
    }

    

       
    const form = <Formik
                enableReinitialize={true}
                initialValues={initialValues}
                validationSchema={quotationSchema}
                onSubmit={(values) =>{
                    handleSubmit(values);
                }}
                > 
                {({touched, errors, dirty, isValid, values, handleChange}) => (
                <Form className={styles.quotationForm}>
                    <h1>Solicitar Cotización</h1>
                    <div className={styles.inputsContainer}>
                        <Field type='email' name='email' placeholder='Correo'class={styles.formControl}/>
                        <Field type='text' name='phoneNumber' placeholder='Celular'class={styles.formControl}/>
                        <select name='contactMethod' onChange={handleChange} value={values.contactMethod} class={styles.formControl}>
                            <option hidden>Método de contacto</option>
                            <option value='Whatsapp'>Whatsapp</option>
                            <option value='Correo'>Correo</option>
                        </select>
                    </div>
                    
                    <div className={styles.inputsContainer}>
                        <Field name='originCountry' placeholder='País de Origen' type='text'class={styles.formControl}/>
                        <Field name='destinationCountry' placeholder='País de Destino' type='text'class={styles.formControl}/>
                        <Field name='qtyBultos' placeholder='Cantidad de Bultos' type='text'class={styles.formControl}/>
                    </div>

                    <div className={styles.inputsContainer}>
                        <Field name='weight' placeholder='Peso en KG' type='text' class={styles.formControl}/>
                        <Field name='cubicMeters' placeholder='Metros cubicos'  type='text' class={styles.formControl}/>
                        <Field name='cubicFeets' placeholder='Pies cubicos' type='text' class={styles.formControl}/>
                    </div>
                    
                    <div className={styles.inputsContainer}>
                        <textarea rows='5' cols='10' name='message' placeholder='Mensaje' type='text' class={`${styles.formControl} ${styles.areaTextControl}`} onChange={handleChange} value={values.message}/>
                        <textarea rows='10' cols='10' name='links' placeholder='Links, separados por coma (,)' type='text' class={`${styles.formControl} ${styles.areaTextControl}`} onChange={handleChange} value={values.links}/>
                    </div>
                    
                    <Button type="submit" class='Normal'>Solicitar cotización</Button>
                </Form>
                )}
            </Formik>
    
    let toRender = null
    switch(status){
        case 'BEFORE':
            toRender = form;
            break;
        case 'LOADING':
            toRender = <Loader/>
            break;
        case 'SUCCESS':
            toRender = <Auxiliary>
                <Message class='Normal-msg' message='Cotización registrada'/>
                <Button class='Normal'><Link to='/quotation/'>Ver mis cotatizaciones</Link> </Button>
            </Auxiliary>
            break;
        case 'FAIL':
            toRender = <Auxiliary>
            <Message class='Error-msg' message='Hubo un problema, intentalo más tarde'/>
            <Button class='Normal'><Link to='/quotation/'>Ver mis cotatizaciones</Link></Button>
        </Auxiliary>
                        
    }
    
    
    
    
    return(
        <Auxiliary>
            {toRender}
        </Auxiliary>
    )
}

export default AddQuotation;