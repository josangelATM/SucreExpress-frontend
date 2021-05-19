import React,{ useState } from 'react'
import BillItem from './BillItem/BillItem'
import { useSelector } from 'react-redux'
import Auxiliary from '../../hoc/Auxiliary/Auxiliary'
import Message from '../UI/Message/Message'
import Button from '../UI/Button/Button'
import sharedStyles from '../../assets/Shared/General.module.css'
import SearchFilter from '../SearchFilter/SearchFilter'
import {exportToCSV} from '../../helpers/helpers'
import compStyles from './BillsViewer.module.css'
const BillsViewer = (props) => {
   
    const isAdmin = useSelector(state => state.auth.isAdmin)
    const billsToRender = props.bills.map(bill => {
        return(
            <BillItem {...bill} key={bill.id}/>
        )
    })

    const tableHeaders = isAdmin ? [
        'ID','CustomerID','Pagado','Factura'
    ] : [
        'ID','Pagado','Factura',
    ]


    const headers = <tr>
    {tableHeaders.map(head =>(
        <th>{head}</th>
    ))}
    </tr>

    const table = props.bills.length > 0 ? 
    <div className={sharedStyles.tableContainer}>
    <Button class='Normal' onClick={() => exportToCSV('billsTable','Bills')}>Exportar datos</Button>
    <table id='billsTable' className={compStyles.billsTable}>
    <thead>
        {headers}
    </thead>
    <tbody>
        {billsToRender}
    </tbody>
</table> </div>: <Message class='Normal-msg' message='Sin facturas para mostrar'/>

    return(
        <Auxiliary>
            <SearchFilter headers={tableHeaders} tableID={'billsTable'} />
            {table}
        </Auxiliary>
    )
}

export default BillsViewer;