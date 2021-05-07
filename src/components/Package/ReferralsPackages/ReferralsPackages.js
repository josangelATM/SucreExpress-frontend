import React, { useEffect, useState } from 'react'
import { useSelector,useDispatch } from 'react-redux'
import { useMediaQuery }  from 'react-responsive'
import ItemsViewerMobile from '../../ItemsViewerMobile/ItemsViewerMobile'
import PackagesViewer from '../PackagesViewer/PackagesViewer'
import axios from 'axios'
import { updatePackages } from '../../../store/actions/index'
import Loader from '../../UI/Loader/Loader'
import Message from '../../UI/Message/Message'
import Auxiliary from '../../../hoc/Auxiliary/Auxiliary'
import compStyles from './ReferralsPackages.module.css'
const ReferralsPackages = () =>{
    const isDesktopOrLaptop = useMediaQuery({ minDeviceWidth: 1224 })
    const [status,setStatus] = useState('LOADING')
    const user = useSelector(state => state.auth.user)
    const dispatch = useDispatch()
    const fetchReferralsPackages = () =>{
        axios.get(`/packages?type=referrals&query=${user.id}`)
        .then(res=>{
            setStatus('SUCCESS')
            dispatch(updatePackages(res.data))
        })
        .catch(err=>{
            setStatus('FAIL')
        })
    }

    useEffect(() =>{
        fetchReferralsPackages()
    })

    let toRender = null
    switch(status){
        case 'LOADING':
            toRender = <Loader/>
            break;
        case 'SUCCESS':
            const headers = {
                'ID': 'id',
                'Origen' : 'source',
                'Tracking' : 'tracking',
                'Peso' : 'weight',
                'Status' :'status',
                'Última actualización' : 'updatedAt',
                'Cliente' : 'owner.firstName',
                'Comentarios' : 'comments'
            } 
            toRender = <div className={compStyles.referralsPackages}>
            <h1 className='title'>Paquetes de Referidos</h1>
            { isDesktopOrLaptop ? <PackagesViewer referrals={user.hasReferrals}/> : <ItemsViewerMobile headers={headers} reduxItem='packages' id={'packageMobileTable'}/>}
        </div>
            break;
        case 'FAIL':
            toRender = <Message class={'Error-msg'} message={'Hubo un error, intentalo más tarde'}/>
            break;
    }
    return(
        <Auxiliary>
            {toRender}
        </Auxiliary>
        
    )
}

export default ReferralsPackages;