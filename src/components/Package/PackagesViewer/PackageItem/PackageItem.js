import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import Auxiliary from '../../../../hoc/Auxiliary/Auxiliary'
import Button from '../../../UI/Button/Button'
import axios from 'axios'
import { formatDate } from '../../../../assets/Shared/JS/utils.js'
import { deletePackages } from '../../../../store/actions/index'
import compStyles from './PackageItem.module.css'
const PackageItem = (props) => {
  
    const isAdmin = useSelector(state => state.auth.isAdmin)
    const dispatch = useDispatch()

    const removePackage = () => {
      axios.delete(`/packages/${props.id}`)
            .then(res => {
              dispatch(deletePackages(props.id))  
            })
            .catch(err =>{
              alert('Hubo un error, intentalo más tarde')
            })    
    }
    

    const confirmation = () =>{
      const answ = window.confirm('¿Seguro que deseas eliminar este paquete?')
      if(answ){
        removePackage()
      }
    }

    let toRender = isAdmin ? <tr>
    <td>{props.id}</td>
    <td>{props.source}</td>
    <td>{props.customerID}</td>
    <td>{props.owner.firstName}</td>
    <td className={compStyles.smallTD}>{props.tracking}</td>
    <td>{props.weight}</td>
    <td>{props.status}</td>
    <td>{formatDate(props.updatedAt)}</td>
    <td><Button class='Link'><Link to={`/packages/update/${props.id}`}>Actualizar</Link></Button></td>
    <td><Button class='Link' onClick={confirmation}>Eliminar</Button></td>
</tr> : <tr>
    <td>{props.id}</td>
    <td>{props.source}</td>
    <td className={compStyles.smallTD}>{props.tracking}</td>
    <td>{props.weight}</td>
    <td>{props.status}</td>
    <td>{formatDate(props.updatedAt)}</td>
</tr>

    // let deleteStatus = null
    // switch(status){
    //   case 'LOADING':
    //     deleteStatus = <Loader/>
    //     break;
    //   case 'SUCCESS':
    //     deleteStatus = <Message class='Normal-msg' message='Paquete eliminado exitosamente' />
    //     break;
    //   case 'FAIL':
    //     deleteStatus = <Message class='Error-msg' message='Hubo un problema, intentalo más tarde' />
    //     break;
    // }
    return(
        <Auxiliary>
            {toRender}
        </Auxiliary>
    )
}

export default PackageItem;