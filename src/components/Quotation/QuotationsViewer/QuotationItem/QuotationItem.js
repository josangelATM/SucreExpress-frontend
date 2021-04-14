import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import Auxiliary from '../../../../hoc/Auxilary/Auxiliary'
import Button from '../../../UI/Button/Button'
import axios from 'axios'

const QuotationItem = (props) =>{
    const userType = useSelector(state => state.auth.user.type)
    const confirmation = () =>{
        const answ = window.confirm('¿Seguro que deseas eliminar esta cotización?')
        if(answ){
          
        }
      }
  
      let toRender = userType=='admin' ? <tr>
        <td>{props.id}</td>
        <td>{props.customerID}</td>
        <td>{props.originCountry}</td>
        <td>{props.destinationCountry}</td>
        <td>{props.weight}</td>     
        <td>{props.status}</td> 
        <td>{props.createdAt}</td>
        <td><Button class='Link'><Link to={`/quotation/${props.id}`}>Actualizar</Link></Button></td>
        <td><Button class='Link' onClick={confirmation}>Eliminar</Button></td>
  </tr> : <tr>
        <td>{props.id}</td>
        <td>{props.originCountry}</td>
        <td>{props.destinationCountry}</td>   
        <td>{props.weight}</td> 
        <td>{props.status}</td> 
        <td>{props.createdAt}</td>
  </tr>
      return(
          <Auxiliary>
              {toRender}
          </Auxiliary>
      )
  }


export default QuotationItem;