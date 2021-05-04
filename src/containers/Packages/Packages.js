import React, { Component } from 'react'
import { connect } from 'react-redux'
import PackagesViewer from '../../components/Package/PackagesViewer/PackagesViewer'
import axios from 'axios'
import Auxiliary from '../../hoc/Auxiliary/Auxiliary'
import './Packages.css'
import { updatePackages } from '../../store/actions/index'
import MediaQuery  from 'react-responsive'
import ItemsViewerMobile from '../../components/ItemsViewerMobile/ItemsViewerMobile'
import Loader from '../../components/UI/Loader/Loader'
import Message from '../../components/UI/Message/Message'


class Packages extends Component{


    state = {  
        packages: [],
        status: 'LOADING'
    }

    fetchPackages(){
        axios.get(`/packages?type=CustomerID&query=${this.props.user.id}`)
            .then(res=>{
                console.log(res.data);
                this.props.updatePackages(res.data)
                this.setState({
                    status : 'SUCCESS'
                })
            })
            .catch(err=>{
                this.setState({
                    status : 'FAILED'
                })
            })
    }


    headers = {
        'ID': 'id',
        'Origen' : 'source',
        'Tracking' : 'tracking',
        'Peso' : 'weight',
        'Status' :'status',
        'Última actualización' : 'updatedAt',
        'Comentarios' : 'comments'
    } 


    componentDidMount(){
        this.fetchPackages()
    }


    render(){
        switch(this.state.status){
            case 'LOADING':
                return(<Loader/>)
            case 'SUCCESS': 
                return(
                    <div className='Packages'>
                <h1 className={'title'}>Tus paquetes</h1>
                <MediaQuery minDeviceWidth={1224}>
                    <PackagesViewer userType={this.props.user.type}/>
                </MediaQuery>
                
                <MediaQuery maxDeviceWidth={1224}>
                    <ItemsViewerMobile headers={this.headers} reduxItem='Package' id={'packageMobileTable'}/>
                </MediaQuery>
                
            </div> 
                )
            case 'FAIL':
                    return(
                        <Message class='Error-msg' message='Hubo un problema, intentalo más tarde'/>
                    )
      
            default: 
                    return(
                        <Message class='Error-msg' message='Hubo un problema, intentalo más tarde'/>
                    )
        


        
    }
}
}

const mapStateToProps = state => {
    return{
        user: state.auth.user
    }
}

const mapDispatchToProps = dispatch =>{
    return{
        updatePackages : (packages) => dispatch(updatePackages(packages))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Packages);