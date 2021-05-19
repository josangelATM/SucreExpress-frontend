import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Auxiliary from '../../../hoc/Auxiliary/Auxiliary'
import { useSelector } from 'react-redux'
import styles from './BillItem.module.css'
const BillItem = (props) => {
    const isAdmin = useSelector(state => state.auth.isAdmin)
    let toRender = isAdmin ? <tr>
    <td><a target='_blank' href={`/bills/${props.id}`} className={styles.clickableLink}>{props.id}</a></td>
    <td>{props.customerID}</td>
    <td>{props.paid == 'Pagado' ? 'Y' : 'N'}</td>
    <td><a href={props.billLink} target='_blank' className={styles.clickableLink}>{props.billFileName}</a></td>
</tr> : <tr>
    <td>{props.id}</td>
    <td>{props.paid == 'Pagado' ? 'Y' : 'N'}</td>
    <td><a href={props.billLink} target='_blank' className={styles.clickableLink}>{props.billFileName}</a></td>
</tr>

    return(
        <Auxiliary>
            {toRender}
        </Auxiliary>
    )
}

export default BillItem;