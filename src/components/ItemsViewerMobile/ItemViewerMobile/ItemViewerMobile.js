import React from 'react'
import compStyles from './ItemViewerMobile.module.css'
import _ from 'lodash'
const ItemViewerMobile = (props) =>{
    return(
        <div className={compStyles.itemContainer}>
            {Object.entries(props.headers).map(item => (
                <div className={compStyles.columnContainer}>

                    <span>{item[0]}</span>
                    { item[1] == 'billLink' ? <span className=
                    {`${compStyles.data} ${_.get(props.item,item[1]) && _.get(props.item,item[1]).length > 20 ? compStyles.smallFont : '' } `}><a rel='noopener noreferrer' target='_blank' className={compStyles.link} href={_.get(props.item,item[1])}>{props.item['billFileName']} </a></span> : <span className=
                    {`${compStyles.data} ${_.get(props.item,item[1]) && _.get(props.item,item[1]).length > 20 ? compStyles.smallFont : '' } `}>{_.get(props.item,item[1])}</span> }
                    
                </div>
            ))}



            
        </div>
    )
}

export default ItemViewerMobile;
