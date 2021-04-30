import React, { Component } from 'react'
import axios from 'axios'
import { connect } from 'react-redux'
import QuotationsViewer from '../../components/Quotation/QuotationsViewer/QuotationsViewer'
import './Quotation.css'
import Button from '../../components/UI/Button/Button'
import { Link } from 'react-router-dom'
import Message from '../../components/UI/Message/Message'
import Loader from '../../components/UI/Loader/Loader'
import { updateQuotations } from '../../store/actions/index'
class Quotation extends Component{
    state = {
        status:'LOADING'
    }

    componentDidMount(){
        this.fetchData()
    }

    fetchData = () => {
        this.setState({status:'LOADING'})
        axios.get(`/quotation?type=CustomerID&query=${this.props.user.id}`)
            .then(res =>{
                this.props.updateQuotations(res.data)
                this.setState({status:'SUCCESS'})

            })
            .catch(err =>{
                this.setState({status:'FAIL'})
            })
    }
    handleSubmit = e =>{
        e.preventDefault()
        const formData = new FormData(e.target)
        const value = Object.fromEntries(formData.entries());
        axios.get(`/quotation/get?type=CustomerID&query=${this.props.user.id}`)
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
                <h1 className='title'>Tus cotizaciones</h1>
                <QuotationsViewer />
                <Button class='Normal'><Link to='/quotation/add'>Solicitar cotización</Link></Button>
            </div>
            )
                break;
            case 'FAIL':
                return(
                    <Message class='Error-msg' message='Hubo un problema, intentalo más tarde'/>
                )
                break;
            default: 
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

const mapDispatchToProps = dispatch => {
    return{
        updateQuotations:(quotations) => dispatch(updateQuotations(quotations))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Quotation);