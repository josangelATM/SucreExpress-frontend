import React from 'react'
import compStyles from './SearchFilterMobile.module.css'
const SearchFilterMobile = (props) =>{

    const filterTable = function() {
        
        let table = document.getElementById(props.tableID);
        let items = table.childNodes 
        let input = document.getElementById('filterInput');
        let filter = input.value.toUpperCase();
        let field = document.getElementById('fieldInput').value
        for(let item of items){
            for(let column of item.childNodes){
                if(column.childNodes[0].innerText == field){
                    if(column.childNodes[1].innerText.toUpperCase().indexOf(filter) > -1){
                        item.style.display=''
                    }else{
                        item.style.display='none'
                    }
                }
            }
        }
    }

    return(
        <div className={compStyles.filterContainer}>
        <h1>Filtrar Resultados</h1>
        <input id='filterInput' placeholder='Filtro' type='text' onChange={filterTable} className={compStyles.input}></input>
        <select id='fieldInput' onChange={filterTable} className={compStyles.input}>
            {props.headers.map(header =>(
                <option value={header}>{header}</option>
            )) }
        </select>
    </div>
    )
}

export default SearchFilterMobile;