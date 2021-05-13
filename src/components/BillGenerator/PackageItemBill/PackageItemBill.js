import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashAlt} from '@fortawesome/free-solid-svg-icons'
import React from 'react'
import compStyles from './PackageItemBill.module.css'
import { deletePackage } from '../../../store/actions/index'
import { useDispatch } from 'react-redux'
const PackageItemBill = (props) => {
    const dispatch = useDispatch()
        return(
            <tr className={compStyles.itemContainer}>
                <td>
                    {props.id}
                </td>
                <td className={compStyles.trackingTD}>
                    {props.tracking}
                </td>
                <td>
                    {props.weight}
                </td>
                <td>
                    <FontAwesomeIcon onClick={() =>dispatch(deletePackage(props.id))} className={compStyles.clickableIcon} icon={faTrashAlt} size='1x'/>
                </td>
            </tr>
    )
}
    

export default PackageItemBill;