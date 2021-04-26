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
    source: Yup.string(),
    customerID: Yup.string().required('Customer ID es requerido'),
    tracking: Yup.string().required('Tracking es requerido'),
    weight: Yup.string()
})

const initialValues = {
    status:'En tránsito',
    source: '',
    customerID:'',
    tracking:'',
    weight:''
}

const AddPackage =  () =>{
    
    const [status,setStatus] = useState('BEFORE')
    const [response,setResponse] = useState('')

    const handleSubmit = (values) => {
        setStatus('LOADING')
        axios.post('/packages',values)
            .then(res =>  {
                setStatus('SUCCESS')
            })
            .catch(err => {
                setResponse(err.response.data);
                setStatus('FAIL')
            })
    }
    
    const packageForm = <Formik
    initialValues={initialValues}
    validationSchema={packageSchema}
    onSubmit={(values, { resetForm }) =>{
        handleSubmit(values);
        if(status==='SUCCESS'){
            resetForm();
        }
        
    }}
>
    {({touched, errors, dirty, isValid, values, handleChange}) =>(
        <Form className='form'>
            <h1>Registrar paquete</h1>
            <span>Campos obligatorios marcados en rojo</span>
            <Field type='text' placeholder='Origen' name='source'
            className={`${formsStyles.normalField}  ${formsStyles.requiredField} `}></Field>
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
            </select>
            <Button class={'Normal'} type="submit" disabled={!dirty || !isValid}>Registrar paquete</Button>
        </Form>
    )}
</Formik>

    switch(status){
        case 'BEFORE':
            return(
             <Auxiliary>
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