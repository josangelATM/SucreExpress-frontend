import React, { Component } from 'react'
import { connect } from 'react-redux'
import PackagesViewer from '../../components/Package/PackagesViewer/PackagesViewer'
import axios from 'axios'
import Auxilary from '../../hoc/Auxilary/Auxiliary'
import './Packages.css'
class Packages extends Component{
    state = {  
        packages: [],
        status: 'LOADING'
    }

    fetchPackages(){
        axios.get(`http://localhost:5000/package/search?type=CustomerID&query=${this.props.user.id}`)
            .then(res=>{
                this.setState({
                    packages : res.data,
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
                <PackagesViewer packages={this.state.packages} userType={this.props.user.type}/>
            </div> 
        )
    }
}

const mapStateToProps = state => {
    return{
        user: state.auth.user
    }
}

export default connect(mapStateToProps,null)(Packages);