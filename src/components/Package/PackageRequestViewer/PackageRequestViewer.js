import React from 'react'
import PackageRequestItem from './PackageRequestItem/PackageRequestItem'
import { useSelector } from 'react-redux'
import Message from '../../UI/Message/Message'
import Auxiliary from '../../../hoc/Auxiliary/Auxiliary'
import Button from '../../UI/Button/Button'
import sharedStyles from '../../../assets/Shared/General.module.css'
import SearchFilter from '../../SearchFilter/SearchFilter'
import {exportToCSV} from '../../../helpers/helpers'
const PackageRequestViewer = (props) =>{
    const requests = useSelector( state => state.request.currentRequests)


    const toRender = requests.map(req =>{
        return(
            <PackageRequestItem request={req} key={req.id}/>
        )
    })

    const tableHeaders = [
        'ID','CustomerID','Tracking','CreatedAt'
    ] 

    const headers =
    <tr>
        {tableHeaders.map(head =>(
            <th>{head}</th>
        ))}
        <th>Eliminar</th>
    </tr>


    const finalRender = requests.length === 0 ? <Message class='Normal-msg' message='Sin solicitudes para mostrar'/> : 
    <div className={sharedStyles.tableContainer}>
    <Button class='Normal' onClick={() => exportToCSV('requestsTable','Requests')}>Exportar datos</Button>
    <table id='requestsTable'>
        <thead>
            {headers}   
        </thead>
        <tbody>
            {toRender}
        </tbody>
    
</table> </div>

    return(
    <Auxiliary>
        <SearchFilter headers={tableHeaders} tableID={'requestsTable'} />
        {finalRender}
    </Auxiliary>
    )
}

export default PackageRequestViewer;