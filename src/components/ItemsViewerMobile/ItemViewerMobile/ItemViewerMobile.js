import React from 'react'
import compStyles from './ItemViewerMobile.module.css'
import _ from 'lodash'
import Button from '../../UI/Button/Button'
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
            { props.details ? 
            <div className={compStyles.detailsContainer}>
                <Button class='Link' size={'small'}><a target='_blank' href={`/${props.itemName}/${props.item.id}`}>Actualizar</a></Button>
            </div> : null }

 
            
        </div>
    )
}

export default ItemViewerMobile;
