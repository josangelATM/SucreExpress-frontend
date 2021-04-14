import React,{ useState } from 'react'
import axios from 'axios'
import Button from '../../UI/Button/Button'
import '../../../assets/Shared/Forms.css'
import * as Yup from 'yup'
import { Formik, Form, Field, ErrorMessage } from "formik";
import Loader from '../../UI/Loader/Loader'

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

    const handleSubmit = (values) => {
        setStatus('LOADING')
        axios.post('http://localhost:5000/package/add',values)
            .then(res =>  {
                setStatus('SUCCESS')
            })
            .catch(err => {
                setStatus('FAIL')
            })
    }

    switch(status){
        case 'BEFORE':
            return(
                <Formik
                    initialValues={initialValues}
                    validationSchema={packageSchema}
                    onSubmit={(values) =>{
                        handleSubmit(values);
                    }}
                >
                    {({touched, errors, dirty, isValid, values, handleChange}) =>(
                        <Form className='form'>
                            <h1>Registrar paquete</h1>
                            <Field type='text' placeholder='Origen' name='source'
                            className={`form-control ${touched.source && errors.source ? 'error' : ''}`}></Field>
                            <Field type='text' placeholder='Customer ID' name='customerID'
                            className={`form-control ${touched.customerID && errors.customerID ? 'error' : ''}`}></Field>
                            <Field type='text' placeholder='Tracking' name='tracking'
                            className={`form-control ${touched.tracking && errors.tracking ? 'error' : ''}`}></Field>
                            <Field type='text' placeholder='Peso' name='weight' 
                            className={`form-control ${touched.weight && errors.weight ? 'error' : ''}`}></Field>
                            <select name="status" value={values.status} onChange={handleChange}
                            className={`form-control ${touched.status && errors.status ? 'error' : ''}`}>
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
            )
            break;
        case 'LOADING':
            return(
                <Loader/>
            )
        case 'SUCCESS':
            return(
                <div>Todo bien</div>
            )
        case 'FAIL':
            return(
                <div>Algo mal</div>
            )
        defalt:
            return(
                <div>Sad</div>
            )
    }   
}


export default AddPackage;