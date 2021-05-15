import React, { useEffect, useState } from 'react'
import { Formik, Form, Field } from "formik"
import * as Yup from 'yup'
import Auxiliary from '../../hoc/Auxiliary/Auxiliary'
import Button from '../UI/Button/Button'
import compStyles from './BillGenerator.module.css'
import { setBillID, addPackage, setLblPrice, updateCustomer } from '../../store/actions/index'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import Loader from '../UI/Loader/Loader'
import PackageItemBill from './PackageItemBill/PackageItemBill'
import { PDFViewer, BlobProvider } from '@react-pdf/renderer'
import BillPdf from './BillPdf/BillPdf'
import { setDiscount, setTotal,deleteAllPackages } from '../../store/actions/billActions'
const YupSchema = Yup.object({
    customerID: Yup.string().required(),
    packageID: Yup.array(),
    lblPrice: Yup.number().required().positive(),
    discount: Yup.number().positive()
})

const initialValues = {
    customerID:'',
    packages:[],
    discount:'',
    lblPrice:''
}



const BillGenerator = () => {
    const customer = useSelector(state => state.bill.customer)
    const lblPrice = useSelector(state => state.bill.lblPrice)
    const billID = useSelector(state => state.bill.billID)
    const packages = useSelector(state => state.bill.packages)
    const total = useSelector(state => state.bill.total)
    const discount = useSelector(state => state.bill.discount)
    const hasPackages = packages.length > 0 ? true : false
    const [showBill,setShowBill] = useState(false)
    const [error, setError] = useState('')
    const dispatch = useDispatch()
    const getBillID = () =>{
        axios.get('/bills/lastID')
            .then((res =>{
                dispatch(setBillID(res.data+1))
            }))
            .catch(err=>{    
                alert(err.response.data)
            })
    }
    const findPackage = (values) =>{
        axios.get(`/packages/${values.packageID}`)
            .then(res=>{
                values.packageID =''
                dispatch(addPackage(res.data)) 
            })
            .catch(err=>{
                alert(err.response.data)
            })
    }

    const findUser = (values) =>{
        axios.get(`/users/${values.customerID}`)
            .then(res=>{
                dispatch(updateCustomer(res.data)) 
                setError('')
            })
            .catch(err=>{
                setError(err.response.data)
                alert(err.response.data)
            })
    }
    const uploadBill = (blobPDF) =>{
        const values = {}
        values.packagesID = packages.map(item =>(item.id))
        values.bill = blobPDF
        values.id = billID.replace('-','')
        values.billName =`${values.id}.pdf`
        values.customerID = customer.id
        const form_data = new FormData();
        for ( let key in values ) {
            form_data.append(key, values[key]);
        }
        axios.post('/bills',form_data)
        .then(res=>{
            alert(res.data)
            setShowBill(false)
            dispatch(deleteAllPackages())
        })
        .catch(err=>{
            setError(err.response.data)
            alert(err.response.data)
        })
    }
 
    useEffect( ()=>{
        getBillID()
    })



    const generatorForm = <Formik
    initialValues={initialValues}
    validationSchema={YupSchema}
    onSubmit={(values, {resetForm}) =>{
        values.discount != '' && dispatch(setDiscount(values.discount))
        dispatch(setLblPrice(values.lblPrice))
        findUser(values)
        dispatch(setTotal())
        console.log(error)
        error == '' && setShowBill(true)
        error == '' && resetForm() 
    }}
    >
        {({dirty, isValid, values, handleChange}) =>(
        <Form class='form'>
            <h1 className={compStyles.billGeneratorTitle}>Generador de Facturas</h1>
            { billID == '' ? <Loader/> : <h1>{billID}</h1>}
            <Field type='text' placeholder='CustomerID' name='customerID' className='form-control'/>
            <div className={compStyles.addPackageContainer}>
                <Field type='text' placeholder='ID del paquete' name='packageID' className='form-control'></Field>
                <Button onClick={()=> findPackage(values)} class={'Normal small'} type="Button" disabled={values.packageID == ''}>Agregar paquete</Button>
            </div>
            { packages.length > 0 ? <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Tracking</th>
                        <th>Peso</th>
                        <th>Eliminar</th>
                    </tr>
                </thead>
                <tbody>
                        { packages.map(item =>(
                            <PackageItemBill {...item}/>
                        ))}
                </tbody>
            </table> : null }
            <Field type='text' placeholder='Precio x libra' name='lblPrice' className='form-control'/>
            <Field type='text' placeholder='Descuento' name='discount' className='form-control'/>
            <Button class={'Normal'} type="submit" disabled={!isValid || !hasPackages}>Generar Factura</Button>
        </Form>
        )}
    </Formik>
    return(
        <Auxiliary>
            {generatorForm}
            { showBill ? 
            <div className={compStyles.PDFContainer}>
                <PDFViewer width='80%' height='1000' id={'iframePDF'}>
                    <BillPdf
                    billID={billID}
                    customer={customer}
                    lblPrice={lblPrice}
                    packages={packages}
                    total={total}
                    discount={discount}
                    />
                </PDFViewer>
                <BlobProvider document={<BillPdf
                    billID={billID}
                    customer={customer}
                    lblPrice={lblPrice}
                    packages={packages}
                    total={total}
                    discount={discount}
                    />}>
                    {({ blob, url, loading, error }) => {
                        return loading ? <Loader/> : <Button class='Normal' onClick={() => uploadBill(blob)}>Subir factura</Button>
                    }}
                </BlobProvider>
            </div>
            
            : false}
            
        </Auxiliary>
    )

}

export default BillGenerator;