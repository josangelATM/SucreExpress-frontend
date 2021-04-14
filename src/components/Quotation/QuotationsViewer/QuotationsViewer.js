import React from 'react'
import { useSelector } from 'react-redux'
import QuotationItem from '../QuotationsViewer/QuotationItem/QuotationItem'
import Message from '../../UI/Message/Message'
import Auxilary from '../../../hoc/Auxilary/Auxiliary'

const QuotationsViewer = (props) => {
    const userType = useSelector(state => state.auth.user.type)
    const quotations = props.quotations.map(qt => {
        return(
            <QuotationItem {...qt} key={qt.id}/>
        )
    })


    const headers = userType ==='admin' ? <tr>
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
    {headers}
    {quotations}
    </table> : <Message class='Normal-msg' message='Sin paquetes para mostrar'/>

    return(
        <Auxilary>
            {table}
        </Auxilary>
    )
}

export default QuotationsViewer;

