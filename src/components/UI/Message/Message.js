import React from 'react'
import './Message.css'
const Message = (props) => (
    <div className={`Message ${props.class}`}>
        {props.message}
    </div>
)

export default Message;