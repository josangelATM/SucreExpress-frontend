import React,{useEffect, useState} from 'react'
import axios from 'axios'
import { Redirect, withRouter } from 'react-router-dom'
import Auxiliary from '../../../hoc/Auxiliary/Auxiliary'
import Loader from '../../UI/Loader/Loader'
import Message from '../../UI/Message/Message'
const BillViewer = (props) =>{
    const billID = props.match.params.billID
    const [status,setStatus] = useState('LOADING')
    const [billURL,setBillURL] = useState('')

    const getBillURL = () =>{
        axios.get(`/bills/${billID}`)
            .then(res=>{
                setBillURL(res.data)
                setStatus('SUCCESS')
            })
            .catch(err=>{
                setStatus('FAIL')
            })
    }

    useEffect(()=>{
        getBillURL()
    },[billURL]) 

    let toRender = null
    console.log(status);
    console.log(billURL)
    switch(status){
        case 'LOADING':
            toRender=<Loader/>
            break;
        case 'SUCCESS':
            console.log(billURL);
            toRender= <Redirect to={billURL}/>
            break;
        case 'FAIL':
            toRender= <Message class='Error-msg' message='Hubo un error, intentalo más tarde'/>
            break;
    }
    return(
        <Auxiliary>
            {toRender}
        </Auxiliary>
    )
}


export default withRouter(BillViewer)