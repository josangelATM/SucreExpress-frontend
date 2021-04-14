import React, { Component } from 'react'
import axios from 'axios'
import { connect } from 'react-redux'
import QuotationsViewer from '../../components/Quotation/QuotationsViewer/QuotationsViewer'
import './Quotation.css'
import Button from '../../components/UI/Button/Button'
import { Link } from 'react-router-dom'
import Message from '../../components/UI/Message/Message'
import Loader from '../../components/UI/Loader/Loader'
class Quotation extends Component{
    state = {
        status:'LOADING',
        quotations:[]
    }

    componentDidMount(){
        this.fetchData()
    }

    fetchData = () => {
        this.setState({status:'LOADING'})
        axios.get(`http://localhost:5000/quotation?type=CustomerID&query=${this.props.user.id}`)
            .then(res =>{
                this.setState({quotations:res.data,status:'SUCCESS'})
            })
            .catch(err =>{
                this.setState({quotations:[], status:'FAIL'})
            })
    }
    handleSubmit = e =>{
        e.preventDefault()
        const formData = new FormData(e.target)
        const value = Object.fromEntries(formData.entries());
        axios.get(`http://localhost:5000/quotation/get?type=CustomerID&query=${this.props.user.id}`)
            .then((res) =>{
                this.setState({request:res.data})
            })
            .catch(err =>{
                this.setState({request:[]})
            })
    }
    


    render(){
        switch(this.state.status){
            case 'LOADING':
                return(<Loader/>)
                break;
            case 'SUCCESS':
                return(<div class='quotation'>
                <h1>Tus cotizaciones</h1>
                <QuotationsViewer quotations={this.state.quotations}/>
                <Button class='Normal'><Link to='quotation/add'>Crear cotización</Link></Button>
            </div>
            )
                break;
            case 'FAIL':
                return(
                    <Message class='Error-msg' message='Hubo un problema, intentalo más tarde'/>
                )
                break;
        }

    }
}

const mapStateToProps = state => {
    return{
        user: state.auth.user
    }
}

export default connect(mapStateToProps,null)(Quotation);