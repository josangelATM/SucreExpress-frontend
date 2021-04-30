import React from 'react'
import compStyles from './Comments.module.css'
const Comments = (props) => (
    <div className={compStyles.commentContainer}>
        <span className={`${props.toolTip ? compStyles.text : ''}`}>{props.text}</span>
        {props.toolTip ?   <p className={compStyles.toolTip}>
            {props.toolTip.length > 0 ? props.toolTip : 'Sin comentarios' }
        </p> : null }  
    </div>
)

export default Comments;