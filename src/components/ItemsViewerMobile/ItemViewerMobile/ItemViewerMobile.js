import React from 'react'
import compStyles from './ItemViewerMobile.module.css'
import _ from 'lodash'
const ItemViewerMobile = (props) =>{
    return(
        <div className={compStyles.itemContainer}>
            {Object.entries(props.headers).map(item => (
                <div className={compStyles.columnContainer}>
                    
                    <span>{item[0]}</span>
                    <span className={compStyles.data}>{_.get(props.item,item[1])}</span>
                </div>
            ))}



            
        </div>
    )
}

export default ItemViewerMobile;
