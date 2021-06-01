import React, { useEffect, useState } from 'react'
import axios from 'axios'
import compStyles from './Notifications.module.css'
import { Link } from 'react-router-dom'
const Notifications = () =>{
    const [numQuotations,setNumQuotations] = useState(0)
    const [numRequests,setNumRequests] = useState(0)

    const getQuotations = () =>{
        axios.get('/quotations')
            .then(res=>{
                let count = 0
                for (const quotation of res.data){
                    if(quotation.status == 'En revisión' || quotation.status == 'Pendiente'){
                        count += 1
                    }
                }
                setNumQuotations(count)
            })
            .catch(err=>{
                alert(err.response.data)
            })
    }

    const getRequests = () =>{
        axios.get('/packageRequests')
            .then(res=>{
                setNumRequests(res.data.length)
            })
            .catch(err=>{
                console.log(err)
                alert(err.response.data)
            })
    }

    useEffect( ()=>{
        
        getQuotations()
        getRequests()
        const interval = setInterval(() => {
            getQuotations()
            getRequests()
          }, 60000 );
        
          return () => clearInterval(interval);
    },[])


    return(
        <div className={compStyles.container}>
            <Link to='/quotations'>
                <div className={compStyles.item}>
                    <p className={compStyles.text} >{'Cotizaciones sin responder'}</p>
                    <p className={compStyles.number}>{numQuotations}</p>
                </div>
            </Link>
            
            <Link to='/requests'>
                <div className={compStyles.item}>
                    <p className={compStyles.text}>{'Solicitudes de paquetes'}</p>
                    <p className={compStyles.number}>{numRequests}</p>
                </div>
            </Link>
            
        </div>
    )
}

export default Notifications;