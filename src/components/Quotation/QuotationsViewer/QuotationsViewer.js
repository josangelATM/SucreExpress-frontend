import React from 'react'
import { useSelector } from 'react-redux'
import QuotationItem from '../QuotationsViewer/QuotationItem/QuotationItem'
import Message from '../../UI/Message/Message'
import Auxiliary from '../../../hoc/Auxiliary/Auxiliary'

const QuotationsViewer = (props) => {
    const isAdmin = useSelector(state => state.auth.isAdmin)
    const currentQuotations = useSelector(state => state.quotation.currentQuotations)

    const quotations = currentQuotations.map(qt => {
        return(
            <QuotationItem {...qt} key={qt.id}/>
        )
    })


    const headers = isAdmin ? <tr>
        <th>ID</th>
        <th>CustomerID</th>
        <th>Origen</th>
        <th>Destino</th>
        <th>Weigth</th>
        <th>Status</th>
        <th>Fecha creación</th>
        <th>Ver detalles</th>
        <th>Eliminar</th>
    </tr> :<tr>
        <th>ID</th>
        <th>Origen</th>
        <th>Destino</th>
        <th>Weigth</th>
        <th>Status</th>
        <th>Fecha creación</th>
    </tr>

    const table = quotations.length > 0 ? <table>
        <thead>
            {headers}
        </thead>
        <tbody>
            {quotations}
        </tbody>  
    </table> : <Message class='Normal-msg' message='Sin cotizaciones para mostrar'/>

    return(
        <Auxiliary>
            {table}
        </Auxiliary>
    )
}

export default QuotationsViewer;

