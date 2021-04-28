import React,{ useState } from 'react'
import PackageItem from './PackageItem/PackageItem'
import { useSelector } from 'react-redux'
import '../../../assets/Shared/Tables.css'
import Auxiliary from '../../../hoc/Auxiliary/Auxiliary'
import Message from '../../UI/Message/Message'
import Button from '../../UI/Button/Button'
import compStyles from './PackagesViewer.module.css'
 
const PackagesViewer = (props) => {
    
    const isAdmin = useSelector(state => state.auth.isAdmin)
    const packages = useSelector(state => state.package.currentPackages)

  
    const packagesToRender = packages.map(pa => {
        return(
            <PackageItem {...pa} key={pa.id}/>
        )
    })


    const exportCsv = function download_table_as_csv(table_id, separator = ',') {
        // Select rows from table_id
        var rows = document.querySelectorAll('table#' + 'packagesTable' + ' tr');
        // Construct csv
        var csv = [];
        for (var i = 0; i < rows.length; i++) {
            var row = [], cols = rows[i].querySelectorAll('td, th');
            for (var j = 0; j < cols.length; j++) {
                // Clean innertext to remove multiple spaces and jumpline (break csv)
                var data = cols[j].innerText.replace(/(\r\n|\n|\r)/gm, '').replace(/(\s\s)/gm, ' ')
                data = data.replace(/"/g, '""');
                if(data.length > 15){
                    row.push('"' + '\'' + data + '"');
                }else{
                    row.push('"' + data + '"');
                }
                
            }
            csv.push(row.join(separator));
        }
        var csv_string = csv.join('\n');
        // Download it
        var filename = 'Packages_' + new Date().toLocaleDateString() + '.csv';
        var link = document.createElement('a');
        link.style.display = 'none';
        link.setAttribute('target', '_blank');
        link.setAttribute('href', 'data:text/csv;charset=utf-8,%EF%BB%BF"' + encodeURIComponent(csv_string));
        link.setAttribute('download', filename);
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    }



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

    const table = packages.length > 0 ? 
    <div className={compStyles.tableContainer}>
    <Button class='Normal' onClick={exportCsv}>Exportar datos</Button>
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
            {table}
        </Auxiliary>
    )
}

export default PackagesViewer;