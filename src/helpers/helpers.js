export const exportToCSV = (table_id,title,separator = ',') => {
    // Select rows from table_id
    var rows = document.querySelectorAll('table#' + table_id + ' tr');
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
    var filename = title + new Date().toLocaleDateString() + '.csv';
    var link = document.createElement('a');
    link.style.display = 'none';
    link.setAttribute('target', '_blank');
    link.setAttribute('href', 'data:text/csv;charset=utf-8,%EF%BB%BF"' + encodeURIComponent(csv_string));
    link.setAttribute('download', filename);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

export const ocurrencesCounter = (ocurrences,tableID,field,headers) => {
    let table = document.getElementById(tableID)
    let tr = table.getElementsByTagName("tr");
    let index = headers.indexOf(field)

    let counter = {}
    ocurrences.forEach(ocu =>{
        counter[ocu]=0
    })

    for(let ocurrence of ocurrences){
        for (let i = 0; i < tr.length; i++) {
           if(!tr[i].style[0]){
                if(tr[i].cells[index].outerText == ocurrence){
                    counter[ocurrence]+=1
                }
           }
                
           
        }
    }
    return(counter)
   
}