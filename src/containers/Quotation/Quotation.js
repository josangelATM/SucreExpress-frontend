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
import MediaQuery from 'react-responsive'
import ItemsViewerMobile from '../../components/ItemsViewerMobile/ItemsViewerMobile'
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

    headers = {
        'ID': 'id',
        'Origen' : 'originCountry',
        'Destino' : 'destinationCountry',
        'Peso' : 'weight',
        'Status' :'status',
        'Fecha Creación' : 'createdAt',
        'Comentarios' : 'comments'
    } 




    render(){
        switch(this.state.status){
            case 'LOADING':
                return(<Loader/>)
            case 'SUCCESS':
                return(<div class='quotation'>
                <h1 className='title'>Tus cotizaciones</h1>
                <MediaQuery minDeviceWidth={1224}>
                    <QuotationsViewer />
                </MediaQuery>
                
                <MediaQuery maxDeviceWidth={1224}>
                    <ItemsViewerMobile headers={this.headers} reduxItem='Quotation' id={'quotationMobileTable'}/>
                </MediaQuery>
                <Button class='Normal'><Link to='/quotation/add'>Solicitar cotización</Link></Button>
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

const mapDispatchToProps = dispatch => {
    return{
        updateQuotations:(quotations) => dispatch(updateQuotations(quotations))
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Quotation);