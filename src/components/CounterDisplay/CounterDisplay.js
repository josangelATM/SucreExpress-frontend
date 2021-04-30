import React from 'react'
import compStyles from './CounterDisplay.module.css'
const CounterDisplay = (props)=>{
    
    return(  
    <div className={compStyles.container}>
        {Object.entries(props.counter).map(item => (
            <div className={compStyles.counterContainer}>
                <p>{`${item[0]} :`}</p>
                <p>{item[1]}</p>
            </div>
        ))}
    </div>
)
}
export default CounterDisplay;