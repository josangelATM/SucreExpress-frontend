import React, { useEffect, useState } from 'react'
import { Link, withRouter } from 'react-router-dom'
import axios from 'axios'
import Button from '../../UI/Button/Button'
import * as Yup from 'yup';
import { Formik, Form, Field } from 'formik';
import Loader from '../../UI/Loader/Loader'
import Auxiliary from '../../../hoc/Auxiliary/Auxiliary';
import Message from '../../UI/Message/Message';
import { useDispatch } from 'react-redux';
import {updatePackage} from '../../../store/actions/index'
const packageSchema = Yup.object({
    status: Yup.string().required('Status es requerido'),
    source: Yup.string(),
    logisticStatus: Yup.string().required(),
    id: Yup.string().required('ID no se puede modificar'),
    customerID: Yup.string().required('Customer ID es requerido'),
    tracking: Yup.string().required('Tracking es requerido'),
    weight: Yup.string(),
    comments: Yup.string()
})



const UpdatePackage =  (props) =>{

    const [status,setStatus] = useState('BEFORE')
    const [currentPackage, setPackage] = useState({})
    const idPackage = props.match.params.idPackage;
    const dispatch = useDispatch()
    
    useEffect(() =>{
        axios.get(`/packages/${idPackage}`)
            .then(res => {
                setPackage(res.data)
            })
    },[])

    const handleSubmit = values => {
        setStatus('LOADING')
        axios.patch(`/packages/${idPackage}`,values)
            .then(res =>  {
                setStatus('SUCCESS')
                console.log(res.data)
                dispatch(updatePackage(res.data))
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
                        <Field type='text' placeholder='ID' name='id' 
                        className='form-control disabled' disabled ></Field>
                        <Field type='text' placeholder='Origen' name='source' 
                        className='form-control'></Field>
                        <select name="logisticStatus" value={values.logisticStatus} onChange={handleChange}
                            className={'form-control'}>
                                <option hidden>Status Logistico</option>
                                <option value="Origen">Origen</option>
                                <option value="En tránsito">En tránsito</option>
                                <option value="Destino">Destino</option>
                            </select>
                        <Field type='text' placeholder='Customer ID' name='customerID' defaultValue={values.customerID}
                        className='form-control'></Field>
                        <Field type='text' placeholder='Tracking' name='tracking' defaultValue={values.tracking}
                        className='form-control'></Field>
                        <Field type='text' placeholder='Peso' name='weight' 
                        className='form-control'></Field>
                        <Field type='text' placeholder='Factura ID' name='billID' 
                        className='form-control' disabled></Field>
                        <textarea rows="6" cols="15" placeholder="Comentarios" name='comments' 
                        className='form-control' onChange={handleChange} value={values.comments}></textarea>
                        <select name="status" value={values.status} onChange={handleChange}
                        className='form-control'>
                            <option value="En tránsito" >En tránsito</option>
                            <option value="Miami">Miami</option>
                            <option value="Panamá">Panamá</option>
                            <option value="Pagado">Pagado</option>
                            <option value="Entregado">Entregado</option>
                            <option value="Entregado no pagado">Entregado no pagado</option>
                            <option value="No encontrado">No encontrado</option>
                            <option value="Mal identificado">Mal identificado</option>
                            <option value="Reclamado">Reclamado</option>
                            <option value="Facturado">Facturado</option>
                            <option value="Proveedor">Proveedor</option>
                            <option value="Devuelto al origen">Devuelto al origen</option>
                        </select>
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
        <Auxiliary>
            {toRender}
            <Button class={'Normal'}><Link to='/packages/search'>Volver al buscador</Link></Button>
        </Auxiliary>
    )
}


export default withRouter(UpdatePackage);