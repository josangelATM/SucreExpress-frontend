import React from 'react' 
import { useSelector } from 'react-redux'
import ItemViewerMobile from './ItemViewerMobile/ItemViewerMobile'
import compStyles from './ItemsViewerMobile.module.css'
const ItemsViewerMobile = (props) =>{
    let items = useSelector(state => {
        switch(props.reduxItem){
            case 'Package':
                return state.package.currentPackages
        }
    })
    
    return(
        <div className={compStyles.itemsViewerContainer}>
            {items.map(item =>(
                <ItemViewerMobile headers={props.headers} item={item}/>
            ))}
        </div>
    )
}

export default ItemsViewerMobile;


