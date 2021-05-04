import React, { Component } from 'react'
import { connect } from 'react-redux'
import axios from 'axios'
import Loader from '../../components/UI/Loader/Loader'
import Message from '../../components/UI/Message/Message'
import BillsViewer from '../../components/BillsViewer/BillsViewer'
import styles from './Bill.module.css'
import Auxiliary from '../../hoc/Auxiliary/Auxiliary'
import ItemsViewerMobile from '../../components/ItemsViewerMobile/ItemsViewerMobile'
import MediaQuery  from 'react-responsive'
class Bill extends Component{
    state = {
        status:'LOADING',
        bills:[]
    }

    fetchData = () =>{
        axios.get(`/bills?type=customerID&query=${this.props.userID}`)
            .then(res=>{
                this.setState({status:'SUCCESS',bills:res.data})
            })
            .catch(err=>{
                this.setState({status:'FAIL'})
            })
    }

    componentDidMount(){
        this.fetchData()
    }

    headers = {
        'ID': 'id',
        'Factura' : 'billLink'
    } 

    render(){
        let toRender = null
        switch(this.state.status){
            case 'LOADING':
                toRender=<Loader/>
                break;
            case 'SUCCESS': 
                toRender = 
                <Auxiliary>
                    <MediaQuery minDeviceWidth={1224}>
                        <BillsViewer bills={this.state.bills}/>
                    </MediaQuery>
                
                <MediaQuery maxDeviceWidth={1224}>
                        <ItemsViewerMobile headers={this.headers} items={this.state.bills} id={'packageMobileTable'}/>
                </MediaQuery>
                </Auxiliary>
       
                break;
            case 'FAIL':
                toRender = <Message class='Error-msg' name='Hubo un problema, intentalo más tarde'/>
                break;
        }
        return(
            <div className={styles.myBills}>
                <h1 className={styles.title}>Tus facturas</h1>
                {toRender}

            </div>
        )
    }
}


const mapStateToProps = state => {
    return{
        userID: state.auth.user.id
    }
}

export default connect(mapStateToProps,null)(Bill);