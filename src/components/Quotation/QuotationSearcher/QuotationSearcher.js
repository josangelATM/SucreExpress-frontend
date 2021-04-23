import React, { useState, useEffect }  from 'react'
import axios from 'axios'
import Button from '../../UI/Button/Button'
import QuotationsViewer from '../QuotationsViewer/QuotationsViewer'
import Loader from '../../UI/Loader/Loader'
import * as Yup from 'yup'
import { Formik, Form, Field, ErrorMessage } from "formik";
import '../../../assets/Shared/Forms.css'
import Message from '../../UI/Message/Message'
import { useDispatch } from 'react-redux'
import { updateQuotations } from '../../../store/actions/index'
const searchSchema = Yup.object({
    query: Yup.string().required('Info requerida'),
    type: Yup.string().required('Tipo de búsqueda ')
})

const initialValues = {
    query:'',
    type:'CustomerID'
}


const QuotationSearcher = () => {
    const dispatch = useDispatch()
    const [status,setStatus] = useState('LOADING')

    const handleSubmit = values =>{
        setStatus('LOADING')
        axios.get(`/quotation?type=${values.type}&query=${values.query}`)
            .then(res =>  {
                if(res.data.length === 0){
                    setStatus('NO_RESULT')
                }else{  
                    setStatus('SUCCESS')
                    dispatch(updateQuotations(res.data))
                }   
            })
            .catch(err => {
                setStatus('FAIL')
        })
    }   

    const fetchQuotations = () => {
        axios.get(`/quotation?limit=10`)
            .then(res=>{
                if(Array.isArray(res.data) || res.data.length === 0){
                    setStatus('SUCCESS')
                    dispatch(updateQuotations(res.data))
                }else{
                    setStatus('NO_RESULT')
                }
                
            })
            .catch(err=>{
                setStatus('FAIL')
            })
    }

    useEffect(() => {
        fetchQuotations();
    },[])

    let searchResult = null
    let form = <Formik
        initialValues={initialValues}
        validationSchema={searchSchema}
        onSubmit={(values) =>{
            handleSubmit(values);
        }}
        >
            {({dirty, isValid, values, handleChange}) =>(
            <Form class='form'>
                <h1>Búsqueda de cotizaciones</h1>
                <Field type='text' placeholder='ID/CustomerID' name='query' className='form-control'></Field>
                <select name='type' onChange={handleChange} value={values.type} className='form-control'>  
                    <option value='CustomerID'>CustomerID</option>
                    <option value='ID' selected>ID</option>
                </select>
                <Button class={'Normal'} type="submit" disabled={!dirty || !isValid}>Buscar paquete</Button>
            </Form>
            )}
        </Formik>

    switch (status){
        case 'LOADING': 
            searchResult = <Loader/>
            break;
        case 'SUCCESS':
            searchResult = <QuotationsViewer/>
            break;
        case 'NO_RESULT':
            searchResult = <Message class='Error-msg' message='Sin cotizaciones encontradas'/>
            break;
        case 'FAIL':
            searchResult = <Message class='Error-msg' message='Hubo un error, intente en otro momento'/>
            break;
        default:
            searchResult = <div>Error :'(</div>
    }

    return(
       <div className='searcher'>
           {form}
           {searchResult}
        </div>
        
    )
}

export default QuotationSearcher;