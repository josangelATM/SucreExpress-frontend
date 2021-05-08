import React, { useState }  from 'react'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import axios from 'axios'
import Button from '../../UI/Button/Button'
import Auxiliary from '../../../hoc/Auxiliary/Auxiliary'
import PackagesViewer from '../PackagesViewer/PackagesViewer'
import Loader from '../../UI/Loader/Loader'
import * as Yup from 'yup'
import { Formik, Form, Field, ErrorMessage } from "formik";
import '../../../assets/Shared/Forms.css'
import './Searcher.css'
import Message from '../../UI/Message/Message'
import { updatePackages } from '../../../store/actions/index'
import { useMediaQuery } from 'react-responsive'
import ItemsViewerMobile from '../../ItemsViewerMobile/ItemsViewerMobile'

const searchSchema = Yup.object({
    query: Yup.string().required('Info requerida'),
    type: Yup.string().required('Tipo de búsqueda ')

})

const searchSchemaCust = Yup.object({
    query: Yup.string().required('Info requerida')
})

const initialValues = {
    query:'',
    type:'CustomerID',
    initialDate:'',
    finalDate:''
}


const Searcher = () => {
    const dispatch = useDispatch();
    const [status,setStatus] = useState('BEFORE')
    const userType = useSelector(state => state.auth.user.type)
    const isAdmin = useSelector(state => state.auth.isAdmin)
    const userID = useSelector(state => state.auth.user.id)

    const isDesktopOrLaptop = useMediaQuery({ minDeviceWidth: 1224 })


    const getAll = values =>{
        console.log(values)
        setStatus('LOADING')
        axios.get(`/packages?type=all&initialDate=${values.initialDate}&finalDate=${values.finalDate}`)
            .then(res =>  {
                if(Array.isArray(res.data)){
                    dispatch(updatePackages(res.data))
                    if(res.data.length === 0){
                        setStatus('NO_RESULT')
                    }else{
                        setStatus('SUCCESS')
                    }
                }else{
                    setStatus('TRANSIT')
                }
            })
            .catch(err => {
                setStatus('FAIL')
            })
    }

    const handleSubmit = values =>{
        setStatus('LOADING')
        axios.get(`/packages?type=${values.type}&query=${values.query}&userType=${userType}&customerID=${userID}&initialDate=${values.initialDate}&finalDate=${values.finalDate}`)
            .then(res =>  {
                if(Array.isArray(res.data)){
                    dispatch(updatePackages(res.data))
                    if(res.data.length === 0){
                        setStatus('NO_RESULT')
                    }else{
                        setStatus('SUCCESS')
                    }
                }else{
                    setStatus('TRANSIT')
                }
            })
            .catch(err => {
                setStatus('FAIL')
            })
    }   

    let searchResult = null
    let form = null
    
    if(isAdmin){
        form = 
        <Formik
        initialValues={initialValues}
        validationSchema={searchSchema}
        onSubmit={(values) =>{
            handleSubmit(values);
        }}
        >
            {({dirty, isValid, values, handleChange, resetForm}) =>(
            <Form class='form'>
                <h1>Búsqueda de paquetes</h1>
                <Field type='text' placeholder='ID/CustomerID/Tracking' name='query' className='form-control'></Field>
                <select name='type' onChange={handleChange} value={values.type} className='form-control'>  
                    <option value='CustomerID'>CustomerID</option>
                    <option value='Tracking'>Tracking</option>
                    <option value='ID' selected>ID</option>
                </select>
                <Field type='date' placeholder='initialDate' name='initialDate' className='form-control'></Field>
                <Field type='date' placeholder='finalDate' name='finalDate' className='form-control'></Field>
                <div className={'buttonsContainer'}>
                    <Button class={'Normal'} type="submit" disabled={!dirty || !isValid}>Buscar paquete</Button>
                    <Button class={'Normal'} type="button" onClick={() => getAll(values)} >Mostrar todos</Button>
                </div>
                <Button class={'Normal'} type="button" onClick={resetForm} >Limpiar Campos</Button>
            </Form>
            )}
        </Formik>
    
    }else{
        form = <Formik
        initialValues={{query:''}}

        onSubmit={(values) =>{
            values.type= 'Tracking'
            handleSubmit(values);
        }}
        >
            {({dirty, isValid, values, handleChange}) =>(
            <Form class='form'>
                <h1>Búsqueda de paquetes</h1>
                <Field type='text' placeholder='Tracking' name='query' className='form-control'></Field>
                <Button class={'Normal'} type="submit" disabled={!dirty || !isValid}>Buscar paquete</Button>
            </Form>
            )}
        </Formik>
    }


    switch (status){
        case 'BEFORE':
            searchResult = null
            break;
        case 'LOADING': 
            searchResult = <Loader/>
            break;
        case 'SUCCESS':
            const headers = isAdmin ? {
                'ID': 'id',
                'Origen' : 'source',
                'CustomerID' : 'customerID',
                'Cliente' : 'owner.firstName',
                'Tracking' : 'tracking',
                'Peso' : 'weight',
                'Status' :'status',
                'Última actualización' : 'updatedAt',
                'Comentarios' : 'comments'
            } : {
                'ID': 'id',
                'Origen' : 'source',
                'Tracking' : 'tracking',
                'Peso' : 'weight',
                'Status' :'status',
                'Última actualización' : 'updatedAt',
                'Comentarios' : 'comments'
            } 


       
            searchResult = isDesktopOrLaptop ? <PackagesViewer/> : <ItemsViewerMobile headers={headers} reduxItem='packages' id={'packageMobileTable'} details={isAdmin ? true : false}/>
            break;
        case 'NO_RESULT':
            searchResult = <Message class='Error-msg' message='Búsqueda sin resultados'/>
            break;
        case 'TRANSIT':
            searchResult = <Message class='Normal-msg' message='Paquete actualmente en tránsito'/>
            break;
        case 'FAIL':
            searchResult = <Message class='Error-msg' message='Hubo un error, intente en otro momento'/>
            break;
    }

    return(
       <div className='searcher'>
           {form}
           {searchResult}
        </div>
        
    )
}

export default Searcher;