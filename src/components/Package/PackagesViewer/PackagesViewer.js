import React,{ useState } from 'react'
import PackageItem from './PackageItem/PackageItem'
import { useSelector } from 'react-redux'
import '../../../assets/Shared/Tables.css'
import Auxiliary from '../../../hoc/Auxiliary/Auxiliary'
import Message from '../../UI/Message/Message'

const PackagesViewer = (props) => {
    const isAdmin = useSelector(state => state.auth.isAdmin)
    const packages = useSelector(state => state.package.currentPackages)

  
    const packagesToRender = packages.map(pa => {
        return(
            <PackageItem {...pa} key={pa.id}/>
        )
    })


    const headers = isAdmin  ? <tr>
        <th>ID</th>
        <th>Origen</th>
        <th>CustomerID</th>
        <th>Cliente</th>
        <th>Tracking</th>
        <th>Peso</th>
        <th>Status</th>
        <th>Última actualización</th>
        <th>Actualizar</th>
        <th>Eliminar</th>
    </tr> :<tr>
        <th>ID</th>
        <th>Origen</th>
        <th>Tracking</th>
        <th>Peso</th>
        <th>Status</th>
        <th>Última actualización</th>
    </tr>

    const table = packages.length > 0 ? <table>
    <thead>
        {headers}
    </thead>
    <tbody>
        {packagesToRender}
    </tbody>
</table> : <Message class='Normal-msg' message='Sin paquetes para mostrar'/>

    return(
        <Auxiliary>
            {table}
        </Auxiliary>
    )
}

export default PackagesViewer;