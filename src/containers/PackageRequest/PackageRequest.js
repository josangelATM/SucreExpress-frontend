import React, { Component } from 'react'
import axios from 'axios'
import Button from '../../components/UI/Button/Button'
import Auxilary from '../../hoc/Auxilary/Auxiliary'
import PackageRequestViewer from '../../components/Package/PackageRequestViewer/PackageRequestViewer'

class PackageRequest extends Component{
    state = {
        request:[]
    }

    componentDidMount(){
        this.fetchData()
    }

    fetchData = () => {
        axios.get('http://localhost:5000/packageRequest/first')
            .then(res =>{
                this.setState({request:res.data})
            })
            .catch(err =>{
                console.log(err)
            })
    }
    handleSubmit = e =>{
        e.preventDefault()
        const formData = new FormData(e.target)
        const value = Object.fromEntries(formData.entries());
        axios.get(`http://localhost:5000/packageRequest/find?query=${value.query}&type=${value.type}`)
            .then((res) =>{
                this.setState({request:res.data})
            })
            .catch(err =>{
                this.setState({request:[]})
            })
    }
    


    render(){
        let toRender = null 
        if(this.state.request.length == 0){
            toRender = <form onSubmit={this.handleSubmit}>
            <input type='text' placeholder='CustomerID/Tracking' name='query'></input>
            <select name='type'>
                <option value='CustomerID'>CustomerID</option>
                <option value='Tracking'>Tracking</option>
            </select>
            <Button>Buscar</Button>
            </form>
        }else{
            toRender= <Auxilary>
                <form onSubmit={this.handleSubmit}>
                    <input type='text' placeholder='CustomerID/Tracking' name='query'></input>
                    <select name='type'>
                        <option value='CustomerID'>CustomerID</option>
                        <option value='Tracking'>Tracking</option>
                    </select>
                    <Button>Buscar</Button>
                </form>
                <PackageRequestViewer request={this.state.request} update={this.fetchData}/>
            </Auxilary>
        }
        return(
            <Auxilary>
                {toRender}
            </Auxilary>

        )
    }
}

export default PackageRequest;