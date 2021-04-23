import React,{ useState } from 'react'
import BillItem from './BillItem/BillItem'
import { useSelector } from 'react-redux'
import Auxiliary from '../../hoc/Auxiliary/Auxiliary'
import Message from '../UI/Message/Message'

const BillsViewer = (props) => {
   
    const isAdmin = useSelector(state => state.auth.isAdmin)
    const billsToRender = props.bills.map(bill => {
        return(
            <BillItem {...bill} key={bill.id}/>
        )
    })


    const headers = isAdmin  ? <tr>
        <th>ID</th>
        <th>CustomerID</th>
        <th>Factura</th>
    </tr> :<tr>
        <th>ID</th>
        <th>Factura</th>
    </tr>

    const table = props.bills.length > 0 ? <table>
    <thead>
        {headers}
    </thead>
    <tbody>
        {billsToRender}
    </tbody>
</table> : <Message class='Normal-msg' message='Sin facturas para mostrar'/>

    return(
        <Auxiliary>
            {table}
        </Auxiliary>
    )
}

export default BillsViewer;