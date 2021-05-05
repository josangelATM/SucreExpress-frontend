import React from 'react' 
import { useSelector } from 'react-redux'
import ItemViewerMobile from './ItemViewerMobile/ItemViewerMobile'
import compStyles from './ItemsViewerMobile.module.css'
import Auxiliary from '../../hoc/Auxiliary/Auxiliary'
import Message from '../UI/Message/Message'
import SearchFilterMobile from '../SearchFilter/SearchFilterMobile/SearchFilterMobile'
const ItemsViewerMobile = (props) =>{
    let items = useSelector(state => {
        switch(props.reduxItem){
            case 'packages':
                return state.package.currentPackages
            case 'quotations':
                return state.quotation.currentQuotations
            case 'requests':
                return state.request.currentRequests
            default: 
                return props.items
        }
    })
    let toRender = items.length > 0 ? 
    <Auxiliary>
        <SearchFilterMobile headers={Object.keys(props.headers)} tableID={props.id} />
        <div className={compStyles.itemsViewerContainer} id={props.id}>
        {items.map(item =>(
            <ItemViewerMobile headers={props.headers} item={item} details={props.details} itemName={props.reduxItem}/>
        ))}
        </div> 
    </Auxiliary> : <Message class='Normal-msg' message='Sin registros para mostrar'/>
    
    return(
        <Auxiliary>
            {toRender}
        </Auxiliary>
        
    )
}

export default ItemsViewerMobile;


