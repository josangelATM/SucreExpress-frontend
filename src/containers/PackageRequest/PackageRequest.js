import React, { Component } from 'react'
import axios from 'axios'
import Button from '../../components/UI/Button/Button'
import Auxiliary from '../../hoc/Auxiliary/Auxiliary'
import PackageRequestViewer from '../../components/Package/PackageRequestViewer/PackageRequestViewer'
import * as Yup from 'yup'
import { Formik, Form, Field, ErrorMessage } from "formik";
import Loader from '../../components/UI/Loader/Loader'
import Message from '../../components/UI/Message/Message'
import { connect } from 'react-redux'
import { updateRequests } from '../../store/actions/index'
import  MediaQuery  from 'react-responsive'
import ItemsViewerMobile from '../../components/ItemsViewerMobile/ItemsViewerMobile'
const searchSchema = Yup.object({
    query: Yup.string().required('Info requerida'),
    type: Yup.string().required('Tipo de búsqueda ')
})

const initialValues = {
    query:'',
    type:'CustomerID'
}




class PackageRequest extends Component{
    
    state = {
        status:'LOADING'
    }

    componentDidMount(){
        this.fetchData()
    }

    fetchData = () => {
        this.setState({status:'LOADING'})
        axios.get('/packageRequests?limit=10')
            .then(res =>{
                if(res.data.length === 0){
                    this.setState({status:'NO_RESULT'})
                }else{
                    this.setState({status:'SUCCESS'})
                    this.props.updateRequests(res.data)
                }
            })
            .catch(err =>{
                this.setState({status:'FAIL'})
            })
    }
    handleSubmit = values =>{
        this.setState({status:'LOADING'})
        axios.get(`/packageRequests?query=${values.query}&type=${values.type}&limit=10`)
            .then((res) =>{
                console.log(res.data)
                if(res.data.length === 0){
                    this.setState({status:'NO_RESULT'})
                }else{
                    
                    this.setState({status:'SUCCESS'})
                    this.props.updateRequests(res.data)
                }
            })
            .catch(err =>{
                this.setState({status:'FAIL'})
                this.setState({request:[]})
            })
    }
    
    headers = {
        'ID': 'id',
        'CustomerID':'customerID',
        'Tracking' : 'tracking',
        'Fecha Creación': 'createdAt'
    } 


    render(){
        let form = <Formik
        initialValues={initialValues}
        validationSchema={searchSchema}
        onSubmit={(values) =>{
            this.handleSubmit(values);
        }}
        >
            {({dirty, isValid, values, handleChange}) =>(
            <Form class='form'>
                <h1>Búsqueda de Solicitudes</h1>
                <Field type='text' placeholder='ID/CustomerID' name='query' className='form-control'></Field>
                <select name='type' onChange={handleChange} value={values.type} className='form-control'>  
                    <option value='CustomerID'>CustomerID</option>
                    <option value='Tracking' selected>Tracking</option>
                </select>
                <Button class={'Normal'} type="submit" disabled={!dirty || !isValid}>Buscar paquete</Button>
            </Form>
            )}
        </Formik>
        let toRender = null 
   
        switch(this.state.status){
            case 'LOADING':
                toRender = <Loader/>
                break;
            case 'SUCCESS':
                toRender = <Auxiliary>
                <MediaQuery minDeviceWidth={1224}>
                    <PackageRequestViewer/>
                </MediaQuery>
            
            <MediaQuery maxDeviceWidth={1224}>
                    <ItemsViewerMobile headers={this.headers} reduxItem={'requests'} id={'requestMobileTable'}/>
            </MediaQuery>
            </Auxiliary>
            break;
            case 'NO_RESULT':
                toRender = <Message class='Normal-msg' message='Sin solicitudes encontradas'/>
                break;
            case 'FAIL':
                toRender = <Message class='Error-msg' message='Hubo un problema, intentalo más tarde'/>
                break;
        }
                
        return(
            <Auxiliary>
                {form}
                {toRender}
            </Auxiliary>

        )
    }
}


const mapDispatchToProps = (dispatch) => {
    return{
        updateRequests: (requests) => dispatch(updateRequests(requests))
    }
    
}

export default connect(null,mapDispatchToProps)(PackageRequest);