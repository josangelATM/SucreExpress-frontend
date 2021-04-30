import React from 'react'
import { Link } from 'react-router-dom'
import Auxiliary from '../../../../hoc/Auxiliary/Auxiliary'
import Button from '../../../UI/Button/Button'

const UserItem = (props) =>{

      let toRender = <tr>
        <td>{props.id}</td>
        <td>{props.firstName}</td>
        <td>{props.lastName}</td>
        <td>{props.username}</td>
        <td>{props.email}</td>
        <td>{props.phoneNumber}</td>
        <td><Button class='Link'><Link to={`/users/${props.id}`}>Ver más</Link></Button></td>
  </tr> 
      return(
          <Auxiliary>
              {toRender}
          </Auxiliary>
      )
}


export default UserItem;