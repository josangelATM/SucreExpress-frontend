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
import { PDFViewer } from '@react-pdf/renderer'
import BillPdf from './BillPdf/BillPdf'
import { setDiscount, setTotal } from '../../store/actions/billActions'
const YupSchema = Yup.object({
    customerID: Yup.string().required(),
    packageID: Yup.array(),
    lblPrice: Yup.number().required().positive(),
    discount: Yup.number().positive()
})

const initialValues = {
    customerID:'',
    packages:[],
    discount:''
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
    const dispatch = useDispatch()
    const getBillID = () =>{
        axios.get('/bills/lastID')
            .then((res =>{
                dispatch(setBillID(res.data+1))
            }))
            .catch(err=>{
                alert('Ha ocurrido un error, intentalo más tarde')
            })
    }
    const findPackage = (values) =>{
        axios.get(`/packages/${values.packageID}`)
            .then(res=>{
                values.packageID =''
                dispatch(addPackage(res.data)) 
            })
            .catch(err=>{
                alert('Error :(')
            })
    }

    const findUser = (values) =>{
        axios.get(`/users/${values.customerID}`)
            .then(res=>{
                dispatch(updateCustomer(res.data)) 
            })
            .catch(err=>{
                alert('Error :(')
            })
    }
    useEffect( ()=>{
        getBillID()
    })



    const generatorForm = <Formik
    initialValues={initialValues}
    validationSchema={YupSchema}
    onSubmit={(values) =>{
        values.discount != '' && dispatch(setDiscount(values.discount))
        dispatch(setLblPrice(values.lblPrice))
        findUser(values)
        dispatch(setTotal())
        setShowBill(true)
       
    }}
    >
        {({dirty, isValid, values, handleChange}) =>(
        <Form class='form'>
            <h1>Generador de Facturas</h1>
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
            { showBill ? <PDFViewer width='80%' height='1000' file>
                <BillPdf
                billID={billID}
                customer={customer}
                lblPrice={lblPrice}
                packages={packages}
                total={total}
                discount={discount}
                />
            </PDFViewer> : false}
            
        </Auxiliary>
    )

}

export default BillGenerator;