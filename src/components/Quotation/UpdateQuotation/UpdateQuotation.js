import React, { useEffect, useState } from 'react'
import { Link, withRouter } from 'react-router-dom'
import axios from 'axios'
import Loader from '../../UI/Loader/Loader'
import { Formik, Form, Field, ErrorMessage } from "formik";
import Auxiliary from '../../../hoc/Auxiliary/Auxiliary'
import Button from '../../UI/Button/Button'
import Message from '../../UI/Message/Message'
import styles from '../AddQuotation/AddQuotation.module.css'
const UpdateQuotation = (props) => {
    const quotationID = props.match.params.quotationID
    const [quotation,setQuotation] = useState({})
    const [status,setStatus] = useState('LOADING')

    const getQuotation = () =>{
        axios.get(`/quotations/${quotationID}`)
            .then(res=>{
                setStatus('SUCCESS')
                setQuotation(res.data)
            })
            .catch(err=>{
                setStatus('FAIL')
            })
    }
    
    const handleSubmit = (values) =>{
        axios.patch(`/quotations/${quotationID}`,values)
            .then(res=>{
                setStatus('UPDATED')
                setQuotation(res.data)
            })
            .catch(err=>{
                setStatus('FAIL_UPDATE')
            })
    }

    useEffect(() => {
        console.log('useEffect')
        getQuotation()
    },[])

    let toRender = null 
    switch(status){
        case 'LOADING':
            toRender = <Loader/>
            break;
        case 'SUCCESS':
            toRender = <Formik
            initialValues={{...quotation}}
            enableReinitialize={true}                 
            onSubmit={(values) =>{
                handleSubmit(values);
            }}>
            {({touched, errors, dirty, isValid, values, handleChange}) => (
            <Form className={styles.quotationForm}>
                <h1>Actualizar Cotización</h1>
                <div className={styles.inputsContainer}>
                    <Field type='email' name='email' placeholder='Correo'class={styles.formControl} disabled />
                    <Field type='text' name='phoneNumber' placeholder='Celular'class={styles.formControl} disabled/>
                    <select name='contactMethod' onChange={handleChange} value={values.contactMethod} class={styles.formControl} disabled>
                        <option value='Whatsapp'>Whatsapp</option>
                        <option value='Correo'>Correo</option>
                    </select>
                </div>
                
                <div className={styles.inputsContainer}>
                    <Field name='originCountry' placeholder='País de Origen' type='text'class={styles.formControl} disabled/>
                    <Field name='destinationCountry' placeholder='País de Destino' type='text'class={styles.formControl} disabled/>
                    <Field name='qtyBultos' placeholder='Cantidad de Bultos' type='text'class={styles.formControl} disabled/>
                </div>

                <div className={styles.inputsContainer}>
                    <Field name='weight' placeholder='Peso en KG' type='text' class={styles.formControl} disabled/>
                    <Field name='cubicMeters' placeholder='Metros cubicos'  type='text' class={styles.formControl} disabled/>
                    <Field name='cubicFeets' placeholder='Pies cubicos' type='text' class={styles.formControl} disabled/>
                </div>
                
                <div className={styles.inputsContainer}>
                    <textarea rows='5' cols='10' name='message' placeholder='Mensaje' type='text' class={`${styles.formControl} ${styles.areaTextControl}`}  disabled onChange={handleChange} value={values.message}/>
                    <div className={styles.linksContainer}>
                        { values.links ? values.links.map((link,idx)=>(<a class='link' href={link} target="_blank">Producto {idx+1}</a>)) : null}   
                        
                    </div>
                    
                </div>
                <select name='status' onChange={handleChange} value={values.status} className={styles.formControl}>
                            <option value='Pendiente'>Pendiente</option>
                            <option value='En revisión'>En revisión</option>
                            <option value='Respondida (Whatsapp)'>Respondida (Whatsapp)</option>
                            <option value='Respondida (Email)'>Respondida (Email)</option>
                        </select>
                <Button type="submit" class='Normal'>Solicitar cotización</Button>
            </Form>
            )}
        </Formik>

        
            break; 
        case 'FAIL':
            toRender = <Message class='Error-msg' message='Hubo un problema, intentelo más tarde'></Message>
            break;
        case 'UPDATED':
            toRender = <Auxiliary>
                <Message class='Normal-msg' message='Cotización actualizada'></Message>
                <Button class='Normal'><Link to='/quotation/search'>Buscar cotizaciones</Link></Button>
            </Auxiliary>
            break;
        case 'FAIL_UPDATED':
            toRender = <Auxiliary>
            <Message class='Error-msg' message='Hubo un problema, intentelo más tarde'></Message>
            <Button class='Normal'><Link to='quotation/search'>Buscar cotizaciones</Link></Button>
        </Auxiliary>
        break;
    
    }

    
    return(
        <Auxiliary>
            {toRender}
        </Auxiliary>
    )
}


export default withRouter(UpdateQuotation)