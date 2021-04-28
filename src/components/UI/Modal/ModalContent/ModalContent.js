import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react'
import Modal from '../Modal';
import compStyles from './ModalContent.module.css'
import {faTimesCircle} from '@fortawesome/free-solid-svg-icons'
const ModalContent = (props) =>{

    return(
    <Modal id={props.id} status={props.status} toggleModal={props.toggleModal} >
        <div className={compStyles.modalContent}> 
            <div className={compStyles.closeContainer}>
                <h3>Comentarios</h3>
                <FontAwesomeIcon onClick={props.toggleModal} className={compStyles.closeBtn} icon={faTimesCircle} size='1x'/>
            </div>
            {props.children}
        </div>
    </Modal>
    
)
}

export default ModalContent;