import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import Auxiliary from '../../../../hoc/Auxilary/Auxiliary'
import Button from '../../../UI/Button/Button'
import axios from 'axios'


const PackageItem = (props) => {
  
    const userType = useSelector(state => state.auth.user.type)
    const [status,setStatus] = useState('BEFORE')
    const dispatch = useDispatch()

    const removePackage = () => {
      setStatus('LOADING')
      axios.delete(`http://localhost:5000/quotation/remove/${props.id}`)
            .then(res => {
              setStatus('SUCCESS')
            })
            .catch(err =>{
              setStatus('FAIL')
            })    
    }
    

    const confirmation = () =>{
      const answ = window.confirm('¿Seguro que deseas eliminar este paquete?')
      if(answ){
        removePackage()
      }
    }

    let toRender = userType=='admin' ? <tr>
    <td>{props.id}</td>
    <td>{props.source}</td>
    <td>{props.customerID}</td>
    <td>{props.tracking}</td>
    <td>{props.weight}</td>
    <td>{props.status}</td>
    <td>{props.updatedAt}</td>
    <td><Button class='Link'><Link to={`/quotation/update/${props.id}`}>Actualizar</Link></Button></td>
    <td><Button class='Link' onClick={confirmation}>Eliminar</Button></td>
</tr> : <tr>
    <td>{props.id}</td>
    <td>{props.source}</td>
    <td>{props.tracking}</td>
    <td>{props.weight}</td>
    <td>{props.status}</td>
    <td>{props.updatedAt}</td>
</tr>
    return(
        <Auxiliary>
            {toRender}
        </Auxiliary>
    )
}

export default PackageItem;