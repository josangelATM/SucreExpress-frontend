import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import Auxiliary from '../../../../hoc/Auxiliary/Auxiliary'
import Button from '../../../UI/Button/Button'
import axios from 'axios'

import { deletePackages } from '../../../../store/actions/index'
import compStyles from './PackageItem.module.css'
import ModalContent from '../../../UI/Modal/ModalContent/ModalContent'
import Comments from './Comments/Comments'
const PackageItem = (props) => {
    const [showModal,setShowModal] = useState(false)
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

    const toggleModal = () =>{
      setShowModal(!showModal)
    }

    const hasComments = props.comments ? true:false
    

    let toRender = isAdmin ? <tr>
    <td>{props.id}</td>
    <td>{props.customerID}</td>
    <td>{props.owner.firstName}</td>
    {/* <td><Link target='_blank' className={compStyles.link} to={`/users/${props.owner.referredBy}`}>{props.owner.referredBy}</Link></td> */}
    <td className={compStyles.smallTD}>
      <Comments text={props.tracking} toolTip={props.comments}/>
    </td>
    <td>{props.weight}</td>
    <td>{props.logisticStatus}</td>
    <td>{props.status}</td>
    <td>{props.paid == 'Pagado' ? 'Y' : 'N'}</td>
    <td>{props.updatedAt}</td>
    <td><Button class='Link' size={'small'}><a target='_blank' href={`/packages/${props.id}`}>Actualizar</a></Button></td>
</tr> : <tr>
    <td>{props.id}</td>
    <td>{props.source}</td>
    <td className={compStyles.smallTD}>{props.tracking}</td>
    <td>{props.weight}</td>
    <td>{props.status}</td>
    <td>{props.paid == 'Pagado' ? 'Y' : 'N'}</td>
    <td>
      {props.billID && props.bill ? 
      <a className={compStyles.link} target={'_blank'} href={props.bill.billLink}>{props.billID}</a> : null }
    </td>
    <td>{props.updatedAt}</td>
    { props.referrals ? <td>{props.owner.firstName}</td> : null}
    <td><Button disabled={!hasComments} class='Link' size={'small'} onClick={toggleModal}>Ver comentarios</Button></td>
    <ModalContent id={`item${props.id}`} status={showModal} toggleModal={toggleModal}>
        { hasComments && props.comments.length  === 0 ? <p>No comments</p> : <p>{props.comments}</p>}
    </ModalContent>
</tr>
    return(
        <Auxiliary>
            {toRender}
        </Auxiliary>
    )
}

export default PackageItem;