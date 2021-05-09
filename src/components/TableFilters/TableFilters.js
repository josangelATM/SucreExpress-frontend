import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlusCircle, faMinusCircle } from '@fortawesome/free-solid-svg-icons'
import React, { useEffect, useState } from 'react'
import compStyles from './TableFilters.module.css'

const TableFilters = (props) =>{
    const [filtersQty,setFiltersQty] = useState(props.qty)
    let queriesID = []
    let fieldsID = []
    let filters = []

    const filterTable = function(queriesID,fieldsID,tableID,headers) {
        let table, tr, th,td, i,txtValues;
        table = document.getElementById(tableID);
        tr = table.getElementsByTagName("tr");
        th = table.getElementsByTagName("th");
        const queries = queriesID.map(queryID=>(document.getElementById(queryID).value))
        const indexes = fieldsID.map(field =>(headers.indexOf(document.getElementById(field).value)))
        for (i = 1; i < tr.length; i++) {
            td = indexes.map(index=>(tr[i].getElementsByTagName("td")[index]))
            if (td) {
            txtValues = td.map(t=>(t.innerText))
            txtValues.forEach(txtValue=>{
                for(let query of queries){
                    if (txtValue.toUpperCase().indexOf(query.toUpperCase()) > -1) {
                        tr[i].style.display = "";
                    } else {
                        tr[i].style.display = "none";
                    }    
                } 
            })
            
        }
        }
        props.updatedCounter && props.updatedCounter()
    
    }

    useEffect( ()=>{
        filterTable(queriesID,fieldsID,props.tableID,props.headers)
    },[filtersQty])

    for(let i=0; i < filtersQty; i++){
        queriesID.push(`query${i}`)
        fieldsID.push(`field${i}`)
        filters.push(
            <div className={compStyles.filterContainer}>
                <input type='text' id={`query${i}`} className={compStyles.formControl} placeholder='Filtro' onChange={()=>filterTable(queriesID,fieldsID,props.tableID,props.headers)}></input>
                <select id={`field${i}`} className={compStyles.formControl} onChange={()=>filterTable(queriesID,fieldsID,props.tableID,props.headers)}>
                {props.headers.map(header =>(
                    <option value={header}>{header}</option>
                )) }
            </select>
            </div>
        )
    }
    return(
        <div className={compStyles.tableFilters}>
            <h1>Filtros</h1>
            <div className={compStyles.content}>
                <div className={compStyles.filtersContainer}>
                    {filters}
                </div>
                
                <div className={compStyles.btnsContainer}>
                    { filtersQty < 5 ? <FontAwesomeIcon icon={faPlusCircle} size='2x' onClick={() =>{setFiltersQty(filtersQty+1)}}/> : null } 
                    { filtersQty != 1 ? <FontAwesomeIcon icon={faMinusCircle} size='2x' onClick={() =>{setFiltersQty(filtersQty-1)}}/> : null } 
                </div>
            </div>
        </div>
    )

}

export default TableFilters;
