import React,{useEffect, useState} from 'react'
import axios from 'axios'
import { withRouter } from 'react-router-dom'
import Auxiliary from '../../../hoc/Auxiliary/Auxiliary'
import Loader from '../../UI/Loader/Loader'
import Message from '../../UI/Message/Message'
import Button from '../../UI/Button/Button'
import * as Yup from 'yup';
import { Formik, Form, Field } from 'formik';
import compStyles from './BillViewer.module.css'
const formSchema = Yup.object({
    id: Yup.string().required(),
    customerID: Yup.string().required(),
    billLink: Yup.string().required(),
    createdAt: Yup.string().required(),
    paid: Yup.string() })

const BillViewer = (props) =>{
    const billID = props.match.params.billID
    const [status,setStatus] = useState('LOADING')
    const [bill,setBill] = useState({})
    const getBillURL = () =>{
        setStatus('LOADING')
        axios.get(`/bills/${billID}`)
            .then(res=>{
                setBill(res.data)
                setStatus('SUCCESS')
            })
            .catch(err=>{
                alert(err.response.data)
                setStatus('FAIL')
            })
    }

    const handleSubmit = (values) =>{
        setStatus('LOADING')
        axios.patch(`/bills/${billID}`,values)
            .then(res=>{
                alert(res.data)
                setStatus('SUCCESS')
            })
            .catch(err=>{
                alert(err.response.data)
            })
    }

    useEffect(()=>{
        getBillURL()
    },[billID]) 
    

    let toRender = null
    switch(status){
        case 'LOADING':
            toRender=<Loader/>
            break;
        case 'SUCCESS':
            toRender= <Formik
            enableReinitialize={true}
            initialValues={bill}
            validationSchema={formSchema}
            onSubmit={(values) =>{
               handleSubmit(values)
            }}
        >
        {({dirty, isValid, values, handleChange}) =>(
                <Form className='form'>
                <h1>Actualizar factura</h1>
                    <Field type='text' placeholder='ID' name='id' className='form-control' disabled/>
                    <Field type='text' placeholder='CustomerID' name='customerID' className='form-control' disabled/>
                    <a href={values.billLink} className={compStyles.clickableLink} target={'_blank'} >{values.billFileName}</a>
                    <select name="paid" value={values.paid} onChange={handleChange}
                        className='form-control'>
                            <option value="Pagado">Pagado</option>
                            <option value="No pagado">No pagado</option>
                    </select>
                <Button class={'Normal'} type="submit" disabled={!dirty || !isValid}>Guardar</Button>
            </Form>
            )}
        </Formik>
            break;
        case 'FAIL':
            toRender= <Message class='Error-msg' message={'Ha ocurido un error, intentalo más tarde por favor'}/>
            break;
    }
    return(
        <Auxiliary>
            {toRender}
        </Auxiliary>
    )
}


export default withRouter(BillViewer)