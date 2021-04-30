import React from 'react'
import Message from '../../UI/Message/Message'
import Auxiliary from '../../../hoc/Auxiliary/Auxiliary'
import UserItem from '../UsersViewer/UserItem/UserItem'
import SearchFilter from '../../SearchFilter/SearchFilter'
import sharedStyles from '../../../assets/Shared/General.module.css'
import {exportToCSV} from '../../../helpers/helpers'
import Button from '../../UI/Button/Button'
const UsersViewer = (props) => {

    const users = props.users.map(us => {
        return(
            <UserItem {...us} key={us.id}/>
        )
    })

    const tableHeaders = [
        'ID','Nombre','Apellido','Usuario','Email','Celular'
    ]

    const headers =  <tr>
        {tableHeaders.map(head =>(
            <th>{head}</th>
        ))}
        <th>Ver más</th>
    </tr>

    const table = props.users.length > 0 ? 
    <div className={sharedStyles.tableContainer}>
    <Button class='Normal' onClick={() => exportToCSV('usersTable','Users')}>Exportar datos</Button>
    <table id='usersTable'>
        <thead>
            {headers}
        </thead>
        <tbody>
            {users}
        </tbody>
    </table> </div>
    : <Message class='Normal-msg' message='Sin usuarios para mostrar'/>

    return(
        <Auxiliary>
            <SearchFilter headers={tableHeaders} tableID={'usersTable'}/>
            {table}
        </Auxiliary>
    )
}

export default UsersViewer;

