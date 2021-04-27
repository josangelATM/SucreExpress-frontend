import React, { Component } from 'react'
import { connect } from 'react-redux'
import PackagesViewer from '../../components/Package/PackagesViewer/PackagesViewer'
import axios from 'axios'
import Auxiliary from '../../hoc/Auxiliary/Auxiliary'
import './Packages.css'
import { updatePackages } from '../../store/actions/index'
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
                    status : 'OK'
                })
            })
            .catch(err=>{
                this.setState({
                    status : 'FAILED'
                })
            })
    }

    componentDidMount(){
        this.fetchPackages()
    }


    render(){
        return(
            <div className='Packages'>
                <h1>Tus paquetes</h1>
                <PackagesViewer userType={this.props.user.type}/>
            </div> 
        )
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