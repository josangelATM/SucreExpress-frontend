import React, { useEffect, useState } from 'react'
import { Link, withRouter } from 'react-router-dom'
import axios from 'axios'
import Button from '../../UI/Button/Button'
import * as Yup from 'yup';
import { Formik, Form, Field } from 'formik';
import Loader from '../../UI/Loader/Loader'
import Auxilary from '../../../hoc/Auxilary/Auxiliary';
import Message from '../../UI/Message/Message';

const packageSchema = Yup.object({
    status: Yup.string().required('Status es requerido'),
    source: Yup.string(),
    id: Yup.string().required('ID no se puede modificar'),
    customerID: Yup.string().required('Customer ID es requerido'),
    tracking: Yup.string().required('Tracking es requerido'),
    weight: Yup.string()
})



const UpdatePackage =  (props) =>{

    const [status,setStatus] = useState('BEFORE')
    const [currentPackage, setPackage] = useState({})
    const idPackage = props.match.params.idPackage;

    
    useEffect(() =>{
        axios.get(`http://localhost:5000/package/update/${idPackage}`)
            .then(res => {
                setPackage(res.data)
            })
    },[])

    const handleSubmit = values => {
        setStatus('LOADING')
        axios.post(`http://localhost:5000/package/update/${idPackage}`,values)
            .then(res =>  {
                setStatus('SUCCESS')
            })
            .catch(err => {
                setStatus('FAIL')
            })
    }


    let toRender = null 

    switch (status){
        case 'BEFORE':
            toRender = <Formik
            enableReinitialize 
            initialValues={currentPackage}
            validationSchema={packageSchema}
            onSubmit={(values) =>{
                handleSubmit(values)
            }}
        >
        {({touched, errors, dirty, isValid, values, handleChange}) =>(
                <Form className='form'>
                        <h1>Actualizar paquete</h1>
                        <Field type='text' placeholder='Origen' name='id' 
                        className='form-control disabled' ></Field>
                        <Field type='text' placeholder='Origen' name='source' 
                        className='form-control'></Field>
                        <Field type='text' placeholder='Customer ID' name='customerID' defaultValue={values.customerID}
                        className='form-control'></Field>
                        <Field type='text' placeholder='Tracking' name='tracking' defaultValue={values.tracking}
                        className='form-control'></Field>
                        <Field type='text' placeholder='Peso' name='weight' 
                        className='form-control'></Field>
                        <select name="status" value={values.status} onChange={handleChange}
                        className='form-control'>
                            <option value="En tránsito" >En tránsito</option>
                            <option value="Miami">Miami</option>
                            <option value="Panamá">Panamá</option>
                            <option value="Pagado">Pagado</option>
                            <option value="Entregado">Entregado</option>
                        </select>
                        {console.log(errors)}
                        <Button class={'Normal'} type="submit" disabled={!dirty || !isValid}>Actualizar</Button>
                    </Form>             
                        )}
        </Formik>
            break;
        case 'LOADING':
            toRender = <Loader/>
            break;
        case 'SUCCESS':
            toRender = <Message class='Normal-msg' message='Paquete actualizado exitosamente'/>
            break;
        case 'FAIL':
            toRender = <Message class='Error-msg' message='Hubo un error, intente más tarde'/>
            break;
        default:
            toRender = <Message class='Error-msg' message='Hubo un error, intente más tarde'/>
            break;
}


    return(
        <Auxilary>
            {toRender}
            <Button class={'Normal'}><Link to='/package/search'>Volver al buscador</Link></Button>
        </Auxilary>
    )
}


export default withRouter(UpdatePackage);