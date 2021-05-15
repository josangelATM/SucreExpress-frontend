import React from 'react'
import { useSelector } from 'react-redux'
import QuotationItem from '../QuotationsViewer/QuotationItem/QuotationItem'
import Message from '../../UI/Message/Message'
import Auxiliary from '../../../hoc/Auxiliary/Auxiliary'
import sharedStyles from '../../../assets/Shared/General.module.css'
import SearchFilter from '../../SearchFilter/SearchFilter'
import {exportToCSV} from '../../../helpers/helpers'
import Button from '../../UI/Button/Button'
const QuotationsViewer = (props) => {
    const isAdmin = useSelector(state => state.auth.isAdmin)
    const currentQuotations = useSelector(state => state.quotation.currentQuotations)

    const quotations = currentQuotations.map(qt => {
        return(
            <QuotationItem {...qt} key={qt.id}/>
        )
    })


    const tableHeaders = isAdmin ? [
        'ID','CustomerID','Origen','Destino','Peso','Status','Fecha Creación'
    ] : [
        'ID','Origen','Destino','Weight','Status','Fecha Creación'
    ]


    const headers = <tr>
        {tableHeaders.map(head =>(
            <th>{head}</th>
        ))}
        {isAdmin ?  
        <Auxiliary>
            <th>Ver detalles</th>
            <th>Eliminar</th> 
        </Auxiliary>
        : null }
    </tr>


    const table = quotations.length > 0 ? 
    <div className={sharedStyles.tableContainer}>
    <Button class='Normal' onClick={() => exportToCSV('quotationsTable','Quotations')}>Exportar datos</Button>
    <table id='quotationsTable'>
        <thead>
            {headers}
        </thead>
        <tbody>
            {quotations}
        </tbody>  
    </table> </div> : <Message class='Normal-msg' message='Sin cotizaciones para mostrar'/>

    return(
        <Auxiliary>
            {quotations.length > 0 ? <SearchFilter headers={tableHeaders} tableID={'quotationsTable'} /> : null }
            {table}
        </Auxiliary>
    )
}

export default QuotationsViewer;

