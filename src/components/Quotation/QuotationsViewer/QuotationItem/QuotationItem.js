import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import Auxiliary from '../../../../hoc/Auxiliary/Auxiliary'
import Button from '../../../UI/Button/Button'
import axios from 'axios'
import { deleteQuotation } from '../../../../store/actions/index'


const QuotationItem = (props) =>{
    const isAdmin = useSelector(state => state.auth.isAdmin)
    const dispatch = useDispatch()

    const removeQuotation = () => {
        axios.delete(`/quotation/${props.id}`)
            .then(res =>{
                dispatch(deleteQuotation(props.id))
            })
            .catch(err =>{
                alert('Hubo un problema, intentalo más tarde')
            })
    }


    const confirmation = () =>{
        const answ = window.confirm('¿Seguro que deseas eliminar esta cotización?')
        if(answ){
            removeQuotation();
        }
      }
  
      let toRender = isAdmin ? <tr>
        <td>{props.id}</td>
        <td>{props.customerID}</td>
        <td>{props.originCountry}</td>
        <td>{props.destinationCountry}</td>
        <td>{props.weight}</td>     
        <td>{props.status}</td> 
        <td>{props.createdAt}</td>
        <td><Button class='Link'><Link to={`/quotation/${props.id}`}>Ver más</Link></Button></td>
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