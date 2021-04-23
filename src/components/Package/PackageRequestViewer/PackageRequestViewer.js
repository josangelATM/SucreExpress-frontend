import React from 'react'
import PackageRequestItem from './PackageRequestItem/PackageRequestItem'
import { useSelector } from 'react-redux'
import Message from '../../UI/Message/Message'
import Auxiliary from '../../../hoc/Auxiliary/Auxiliary'

const PackageRequestViewer = (props) =>{
    const requests = useSelector( state => state.request.currentRequests)


    const toRender = requests.map(req =>{
        return(
            <PackageRequestItem request={req} key={req.id}/>
        )
    })

    const headers =
    <tr>
        <th>CustomerID</th>
        <th>Tracking</th>
        <th>CreatedAt</th>
        <th>Eliminar</th>
    </tr>


    const finalRender = requests.length === 0 ? <Message class='Normal-msg' message='Sin solicitudes para mostrar'/> : 
    <table>
        <thead>
            {headers}   
        </thead>
        <tbody>
            {toRender}
        </tbody>
    
</table>  

    return(
    <Auxiliary>
        {finalRender}
    </Auxiliary>
    )
}

export default PackageRequestViewer;