import React, { useState } from 'react' 
import axios from 'axios'
import Loader from '../UI/Loader/Loader'
import BillsViewer from '../BillsViewer/BillsViewer'
import Button from '../UI/Button/Button'
import Message from '../UI/Message/Message'
import { Formik, Form, Field } from "formik"
import * as Yup from 'yup'
import styles from './BillSearcher.module.css'
const searchSchema = Yup.object({
    query: Yup.string().required('Info requerida'),
    type: Yup.string().required('Tipo de búsqueda ')
})

const initialValues = {
    query:'',
    type:'customerID'
}


const BillSearcher = () =>{
    const [status, setStatus] = useState('BEFORE')
    const [bills, setBills] = useState([])

    const searchBills = (values) =>{
        setStatus('LOADING')
        axios.get(`/bills?type=${values.type}&query=${values.query}`)
            .then(res=>{
                setStatus('SUCCESS')
                setBills(res.data)
            })
            .catch(err=>{
                setStatus('FAIL')
            })
    }


    const searcherForm = <Formik
    initialValues={initialValues}
    validationSchema={searchSchema}
    onSubmit={(values) =>{
        searchBills(values);
    }}
    >
        {({dirty, isValid, values, handleChange}) =>(
        <Form class='form'>
            <h1>Búsqueda de facturas</h1>
            <Field type='text' placeholder='ID/CustomerID/Factura' name='query' className='form-control'></Field>
            <select name='type' onChange={handleChange} value={values.type} className='form-control'>  
                <option value='customerID' selected>CustomerID</option>
                <option value='billFillName'>Factura</option>
                <option value='id'>ID</option>
            </select>
            <Button class={'Normal'} type="submit" disabled={!dirty || !isValid}>Buscar facturas</Button>
        </Form>
        )}
    </Formik>


let toRender = null

switch(status){
    case 'LOADING':
        toRender = <Loader/>
        break;
    case 'SUCCESS':
        console.log(bills)
        toRender = <BillsViewer bills={bills}/>
        break;
    case 'FAIL':
        toRender = <Message class='Error-msg' message='Hubo un problema, intentalo más tarde'/>
        break;

}

    return(
        <div className={styles.billSearcher }> 
            {searcherForm}
            {toRender}
        </div>
    )
}

export default BillSearcher;