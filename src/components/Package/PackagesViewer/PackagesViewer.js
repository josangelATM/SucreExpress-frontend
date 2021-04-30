import React,{ useState,useEffect, useLayoutEffect} from 'react'
import PackageItem from './PackageItem/PackageItem'
import { useSelector } from 'react-redux'
import '../../../assets/Shared/Tables.css'
import Auxiliary from '../../../hoc/Auxiliary/Auxiliary'
import Message from '../../UI/Message/Message'
import Button from '../../UI/Button/Button'
import sharedStyles from '../../../assets/Shared/General.module.css'
import SearchFilter from '../../SearchFilter/SearchFilter'
import {exportToCSV,ocurrencesCounter} from '../../../helpers/helpers'
import CounterDisplay from '../../CounterDisplay/CounterDisplay'
import compStyles from './PackagesViewer.module.css'
const PackagesViewer = (props) => {
    
    const isAdmin = useSelector(state => state.auth.isAdmin)
    const packages = useSelector(state => state.package.currentPackages)
    const [counter,setCounter] = useState({})

 
    const packagesToRender = packages.map(pa => {
        return(
            <PackageItem {...pa} key={pa.id}/>
        )
    })

    const tableHeaders = isAdmin ? [
        'ID','Origen','CustomerID','Cliente','Tracking','Peso','Status','Última actualización'
    ] : [
        'ID','Origen','Tracking','Peso','Status','Última actualización'
    ]


    const updateCounter = ()=>{
        setCounter(ocurrencesCounter(['Entregado','Panamá','En tránsito','Reclamado','No encontrado','Mal identificado','Miami','Pagado','Facturado', 'Devuelto al origen'],'packagesTable','Status',tableHeaders))
    }

    useLayoutEffect(()=>{
        if(isAdmin){
            updateCounter()
        }
        
    },[])


    const headers = <tr>
        {tableHeaders.map(head =>(
            <th>{head}</th>
        ))}
        {isAdmin ?  
        <Auxiliary>
            <th>Actualizar</th>
            <th>Eliminar</th> 
        </Auxiliary>
        : 
        <th>Ver comentarios</th> }
    </tr>

    const table = packages.length > 0 ? 
    <div className={sharedStyles.tableContainer}>
    
    <table id='packagesTable'>
        <thead>
            {headers}
        </thead>
        <tbody>
            {packagesToRender}
        </tbody>
    </table>
    </div>
    : <Message class='Normal-msg' message='Sin paquetes para mostrar'/>
    return(
        <Auxiliary>
            {isAdmin ? 
            <Auxiliary>
            <div className={compStyles.functionsContainer}>
                <CounterDisplay counter={counter}/>
                <SearchFilter headers={tableHeaders} tableID={'packagesTable'} updatedCounter={updateCounter}/>
                <Button class='Normal' onClick={() => exportToCSV('packagesTable','Packages')}>Exportar datos</Button>
            </div>
            {table}
            </Auxiliary>
            : 
            <Auxiliary>
            <SearchFilter headers={tableHeaders} tableID={'packagesTable'} updatedCounter={updateCounter}/>
            <Button class='Normal' onClick={() => exportToCSV('packagesTable','Packages')}>Exportar datos</Button> 
            {table} 
            </Auxiliary>
            }
           
        </Auxiliary>
    )
}

export default PackagesViewer;