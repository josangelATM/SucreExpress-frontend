import React from 'react'
import Button from '../../../UI/Button/Button'
import axios from 'axios'
const PackageRequestItem = (props) =>{

    const deleteRequest = () =>{
        axios.delete(`http://localhost:5000/packageRequest/delete/${props.request.id}`)
            .then(res =>{
                console.log('Request eliminado')
                props.update()
            }).catch(err =>{
                console.log('Error')
            })
    }

    return(
        <div>
            <p>{props.request.tracking}</p>
            <p>{props.request.customerID}</p>
            <p>{props.request.createdAt}</p>
            <Button onClick={deleteRequest}>Eliminar registro</Button>
        </div>
    )
}

export default PackageRequestItem;

