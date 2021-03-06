import React from 'react'
import compStyles from './SearchFilter.module.css'
const SearchFilter = (props) =>{

    const filterTable = function() {
        let input, filter, table, tr, th,td, i,index, txtValue,field;
        input = document.getElementById(props.filterInputID);
        filter = input.value.toUpperCase();
        field = document.getElementById(props.fieldInputID).value
        table = document.getElementById(props.tableID);
        tr = table.getElementsByTagName("tr");
        th = table.getElementsByTagName("th");
        index = props.headers.indexOf(field)
        
        for (i = 0; i < tr.length; i++) {
            td = tr[i].getElementsByTagName("td")[index];
            if (td) {
            txtValue = td.textContent || td.innerText;
            if (txtValue.toUpperCase().indexOf(filter) > -1) {
                tr[i].style.display = "";
            } else {
                tr[i].style.display = "none";
            }
        }
        }
        
         props.updatedCounter && props.updatedCounter()
    }

    return(
    <div className={compStyles.filterContainer}>
            <input id={props.filterInputID} placeholder='Filtro' type='text' onChange={filterTable} className={compStyles.input}></input>
            <select id={props.fieldInputID} onChange={filterTable} className={compStyles.input}>
                {props.headers.map(header =>(
                    <option value={header}>{header}</option>
                )) }
            </select>
        </div>
    )
}

export default SearchFilter;