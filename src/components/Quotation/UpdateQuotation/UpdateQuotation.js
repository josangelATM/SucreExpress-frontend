import React, { useEffect, useState } from 'react'
import { Link, withRouter } from 'react-router-dom'
import axios from 'axios'
import Loader from '../../UI/Loader/Loader'
import { Formik, Form, Field, ErrorMessage } from "formik";
import Auxiliary from '../../../hoc/Auxilary/Auxiliary'
import Button from '../../UI/Button/Button'
import Message from '../../UI/Message/Message'
const UpdateQuotation = (props) => {
    const quotationID = props.match.params.quotationID
    const [quotation,setQuotation] = useState({})
    const [status,setStatus] = useState('LOADING')

    const getQuotation = () =>{
        axios.get(`http://localhost:5000/quotation/${quotationID}`)
            .then(res=>{
                setStatus('SUCCESS')
                setQuotation(res.data)
            })
            .catch(err=>{
                setStatus('FAIL')
            })
    }
    
    const handleSubmit = (values) =>{
        axios.patch(`http://localhost:5000/quotation/${quotationID}`,values)
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
            console.log('useEffect')
            toRender = <Formik
            initialValues={{...quotation}}
            enableReinitialize={true}                 
            onSubmit={(values) =>{
                handleSubmit(values);
            }}
            > 
            {({touched, errors, dirty, isValid, values, handleChange}) => (
            <Form className='form'>
                <h1>Cotización {quotation.id}</h1>
                <Field type='email' name='email' placeholder='Correo'class='form-control' disabled />
                <Field type='text' name='phoneNumber' placeholder='Celular'class='form-control' disabled />
                <select name='contactMethod' onChange={handleChange} value={values.contactMethod} class='form-control' disabled>
                    <option hidden>Método de contacto</option>
                    <option value='Whatsapp'>Whatsapp</option>
                    <option value='Correo'>Correo</option>
                </select>
                <Field name='originCountry' placeholder='País de Origen' type='text'class='form-control' disabled />
                <Field name='destinationCountry' placeholder='País de Destino' type='text'class='form-control' disabled />
                <Field name='qtyBultos' placeholder='Cantidad de Bultos' type='text'class='form-control' disabled />
                <Field name='weight' placeholder='Peso en KG' type='text' class='form-control'disabled />
                <Field name='cubicMeters' placeholder='Metros cubicos'  type='text' class='form-control' disabled />
                <Field name='cubicFeets' placeholder='Pies cubicos' type='text' class='form-control' disabled />
                <textarea rows='5' cols='10' name='message' placeholder='Mensaje' type='text' class='form-control' onChange={handleChange} value={values.message}disabled />
                { values.links ? values.links.map((link,idx)=>(<a class='link' href={link}>Producto {idx}</a>)) : null}   
                <select name='status' onChange={handleChange} value={values.status} class='form-control'>
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
                <Button class='Normal'><Link to='quotation/search'>Buscar cotizaciones</Link></Button>
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