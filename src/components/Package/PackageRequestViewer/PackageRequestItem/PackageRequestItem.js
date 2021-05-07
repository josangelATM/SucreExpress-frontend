import React from 'react'
import Button from '../../../UI/Button/Button'
import axios from 'axios'
import { useDispatch } from 'react-redux'
import { deleteRequest } from '../../../../store/actions/index'


const PackageRequestItem = (props) =>{
    const dispatch = useDispatch()

    const removeRequest = () =>{
        axios.delete(`/packageRequests/${props.request.id}`)
            .then(res =>{
                dispatch(deleteRequest(props.request.id))
            }).catch(err =>{
                alert('Hubo un error, intentalo más tarde')
            })
    }

    const confirmation = () =>{
        const answ = window.confirm('¿Seguro que deseas eliminar esta solicitud?')
        if(answ){
            removeRequest()
        }

    }


    return(
        <tr>
            <td>{props.request.id}</td>
            <td>{props.request.customerID}</td>
            <td>{props.request.tracking}</td>
            <td>{props.request.createdAt}</td>
            <td><Button class='Normal' onClick={confirmation}>Eliminar registro</Button></td>
        </tr>
    )
}

export default PackageRequestItem;

