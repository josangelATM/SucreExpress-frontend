import React from 'react'
import Message from '../../UI/Message/Message'
import Auxiliary from '../../../hoc/Auxiliary/Auxiliary'
import UserItem from '../UsersViewer/UserItem/UserItem'
const UsersViewer = (props) => {

    const users = props.users.map(us => {
        return(
            <UserItem {...us} key={us.id}/>
        )
    })


    const headers =  <tr>
        <th>ID</th>
        <th>Nombre</th>
        <th>Apellido</th>
        <th>Email</th>
        <th>Celular</th>
        <th>Ver más</th>
    </tr>

    const table = props.users.length > 0 ? <table>
        <thead>
            {headers}
        </thead>
        <tbody>
            {users}
        </tbody>
    </table> : <Message class='Normal-msg' message='Sin usuarios para mostrar'/>

    return(
        <Auxiliary>
            {table}
        </Auxiliary>
    )
}

export default UsersViewer;

