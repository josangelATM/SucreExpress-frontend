import React, { useState } from 'react'
import axios from 'axios'
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup'
import Auxiliary from '../../hoc/Auxiliary/Auxiliary'
import Message from '../UI/Message/Message'
import Loader from '../UI/Loader/Loader'
import Button from '../UI/Button/Button';
import { serialize } from 'object-to-formdata';

const initialValues = {
    bill:'',
    customerID:'',
    id:'',
    billNumber:''
}

const billSchema = Yup.object({
    bill: Yup.mixed().required(),
    customerID: Yup.string().required(),
    id: Yup.string().required()
})


const BillUploader = () =>{
    const [status,setStatus] = useState('BEFORE')


    const uploadBill = (values) =>{
        const data = serialize(
            values
          );
          console.log(data);
        setStatus('LOADING')
        
        axios.post('/bills',data)
        .then(res=>{
            setStatus('SUCCESS')
        })
        .catch(err=>{
            setStatus('FAIL')
        })
    }

    let uploadForm = <Formik
                    enableReinitialize={true}
                    initialValues={initialValues}
                    onSubmit={(values, {resetForm}) =>{
                        uploadBill(values)
                        resetForm()
                    }}
                >
                {({dirty, isValid, setFieldValue,values}) =>(
                        <Form className='form'>
                                <h1>Guardar factura</h1>
                                    <Field type='text' placeholder='ID' name='id' className='form-control'/>
                                    <Field type='text' placeholder='BillNumber' name='billNumber' className='form-control'/>
                                    <Field type='text' placeholder='CustomerID' name='customerID' className='form-control'/>
                                    <Field type='file' name='bill' value={undefined} className='form-control' onChange={(event) => {setFieldValue("bill", event.currentTarget.files[0])}}></Field>
                                <Button class={'Normal'} type="submit" disabled={!dirty || !isValid}>Guardar</Button>
                            </Form>
                        )}
                    </Formik>


    let toRender = null

    switch(status){
        case 'BEFORE':
            toRender = uploadForm
            break;
        case 'LOADING':
            toRender =
            <Auxiliary>
                <Loader/>
                {uploadForm}
            </Auxiliary>
            break;
        case 'SUCCESS':
            toRender =
            <Auxiliary>
                <Message class='Normal-msg' message='Factura guardada con éxito'/>
                {uploadForm}
            </Auxiliary>
            break;
        case 'FAIL':
            toRender =
            <Auxiliary>
                <Message class='Error-msg' message='Hubo un error, intentalo más tarde'/>
                {uploadForm}
            </Auxiliary>
            break;
    }


    return(
        <Auxiliary>
            {toRender}
        </Auxiliary>

    )
}

export default BillUploader;