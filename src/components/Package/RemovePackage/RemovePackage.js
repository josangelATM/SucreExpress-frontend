import React,{ useState, useEffect } from 'react'
import { withRouter } from 'react-router-dom'
import axios from 'axios'
const RemovePackage = (props) =>{

    const idPackage = props.match.params.idPackage;
    const [message,setMessage] = useState('Cargando...')
    
    useEffect(() => {
        axios.delete(`http://localhost:5000/package/remove/${idPackage}`)
            .then(res => {
                setMessage(res.data)
            })
            .catch(err =>{
                setMessage('Paquete no existente')
            })    
    })

    return(
        <h1>{message}</h1>
    )
}

export default withRouter(RemovePackage);