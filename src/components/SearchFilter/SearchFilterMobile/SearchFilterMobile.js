import React from 'react'
import compStyles from './SearchFilterMobile.module.css'
const SearchFilterMobile = (props) =>{

    const filterTable = function() {
        
        let table = document.getElementById(props.tableID);
        let items = table.childNodes 
        let input = document.getElementById('filterInput');
        let filter = input.value.toUpperCase();
        let field = document.getElementById('fieldInput').value
        console.log(filter)
        console.log(field)
        for(let item of items){
            for(let column of item.childNodes){
                if(column.childNodes[0].innerText == field){
                    if(column.childNodes[1].innerText.toUpperCase().indexOf(filter) > -1){
                        item.style.display=''
                        console.log(item)
                    }else{
                        item.style.display='none'
                    }
                }
            }
        }




        // let input, filter, table, tr, th,td, i,index, txtValue,field;
        // input = document.getElementById('filterInput');
        // filter = input.value.toUpperCase();
        // field = document.getElementById('fieldInput').value
        // table = document.getElementById(props.tableID);
        // tr = table.getElementsByTagName("tr");
        // th = table.getElementsByTagName("th");
        // index = props.headers.indexOf(field)
        
        // for (i = 0; i < tr.length; i++) {
        //     td = tr[i].getElementsByTagName("td")[index];
        //     if (td) {
        //     txtValue = td.textContent || td.innerText;
        //     if (txtValue.toUpperCase().indexOf(filter) > -1) {
        //         tr[i].style.display = "";
        //     } else {
        //         tr[i].style.display = "none";
        //     }
        // }
        // }
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