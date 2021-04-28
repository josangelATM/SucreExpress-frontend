import React from 'react'
import compStyles from './Modal.module.css'
const Modal = (props) =>{
    
    var modal = document.getElementById(props.id);
  
    window.onclick = function(event) {
    if (event.target == modal) {
        props.toggleModal()
    }
    }
    
    return(
    <div id={props.id} className={`${compStyles.modal} ${props.status ? compStyles.show : ''}` }> 
        {props.children}
    </div>
)}

export default Modal;