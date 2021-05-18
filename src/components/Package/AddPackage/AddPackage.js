import React,{ useState } from 'react'
import axios from 'axios'
import Button from '../../UI/Button/Button'
import '../../../assets/Shared/Forms.css'
import * as Yup from 'yup'
import { Formik, Form, Field, ErrorMessage } from "formik";
import Loader from '../../UI/Loader/Loader'
import Auxiliary from '../../../hoc/Auxiliary/Auxiliary'
import Message from '../../UI/Message/Message'
import formsStyles from '../../../assets/Shared/Forms.module.css'
const packageSchema = Yup.object({
    status: Yup.string().required('Status es requerido'),
    logisticStatus: Yup.string().required(),
    source: Yup.string(),
    customerID: Yup.string().required('Customer ID es requerido'),
    tracking: Yup.string().required('Tracking es requerido'),
    weight: Yup.string(),
    comments: Yup.string()
})

const initialValues = {
    status:'En tránsito',
    logisticStatus: '',
    source: '',
    customerID:'',
    tracking:'',
    weight:'',
    comments: ''
}

const AddPackage =  () =>{
    
    const [status,setStatus] = useState('BEFORE')
    const [response,setResponse] = useState('')

    const handleSubmit = (values,resetForm) => {
        setStatus('LOADING')
        axios.post('/packages',values)
            .then(res =>  {
                setResponse(res.data)
                setStatus('SUCCESS')
                resetForm()
            })
            .catch(err => {
                setStatus('FAIL')
                setResponse(err.response.data)
            })
    }
    
    const packageForm = <Formik
    initialValues={initialValues}
    validationSchema={packageSchema}
    onSubmit={(values, { resetForm }) =>{
        handleSubmit(values,resetForm);    
    }}
>
    {({touched, errors, dirty, isValid, values, handleChange}) =>(
        <Form className='form'>
            <h1>Registrar paquete</h1>
            <span>Campos obligatorios marcados en rojo</span>
            <Field type='text' placeholder='Origen' name='source'
            className={`${formsStyles.normalField}  ${formsStyles.requiredField} `}></Field>
            <select name="logisticStatus" value={values.logisticStatus} onChange={handleChange}
            className={`${formsStyles.normalField} ${formsStyles.requiredField} `}>
                <option hidden>Status Logistico</option>
                <option value="Origen">Origen</option>
                <option value="En tránsito">En tránsito</option>
                <option value="Destino">Destino</option>
            </select>
            <Field type='text' placeholder='Customer ID' name='customerID'
            className={`${formsStyles.normalField} ${formsStyles.requiredField} `}></Field>
            <Field type='text' placeholder='Tracking' name='tracking'
            className={`${formsStyles.normalField} ${formsStyles.requiredField} `}></Field>
            <Field type='text' placeholder='Peso' name='weight' 
            className={`${formsStyles.normalField} `}></Field>
            <select name="status" value={values.status} onChange={handleChange}
            className={`${formsStyles.normalField} ${formsStyles.requiredField} `}>
                <option value="En tránsito" selected>En tránsito</option>
                <option value="Miami">Miami</option>
                <option value="Panamá">Panamá</option>
                <option value="Pagado">Pagado</option>
                <option value="Entregado">Entregado</option>
                <option value="Mal identificado">Mal identificado</option>
                <option value="Proveedor">Proveedor</option>
                <option value="No encontrado">No encontrado</option>
            </select>
            <textarea rows="6" cols="15" placeholder="Comentarios" name='comments' 
            className={`${formsStyles.normalField}`} onChange={handleChange} value={values.comments}></textarea>
            <Button class={'Normal'} type="submit" disabled={!dirty || !isValid}>Registrar paquete</Button>
        </Form>
    )}
</Formik>

    switch(status){
        case 'BEFORE':
            return(
             <Auxiliary>
                 <Loader hidden={true}/>
                {packageForm}
             </Auxiliary>   
            )
            break;
        case 'LOADING':
            return(
                <Auxiliary>
                    <Loader/>
                    {packageForm}
                </Auxiliary> 
            )
        case 'SUCCESS':
            return(
                <Auxiliary>
                    <Message class='Normal-msg' message={response}/>
                    {packageForm}  
                </Auxiliary> 
            )
        case 'FAIL':
            return(
                <Auxiliary>
                    <Message class='Error-msg' message={response}/>
                    {packageForm}
                </Auxiliary> 
            )
    }   
}


export default AddPackage;