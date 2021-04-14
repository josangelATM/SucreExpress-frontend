import React, { Component } from 'react'
import { withRouter } from 'react-router'
import axios from 'axios'
import Message from '../../components/UI/Message/Message'
import Loader from '../../components/UI/Loader/Loader'
import Auxiliary from '../../hoc/Auxilary/Auxiliary'

class Activate extends Component{
    state = {
        status : 'PENDING',
        response: 'CARGANDO...'
    }

    componentDidMount() {
        const id = this.props.match.params.userID;
        const code = this.props.match.params.code;

        axios.get(`http://localhost:5000/register/${id}/${code}`)
            .then(res => {
                
                this.setState({status: 'SUCCESFUL', response:res.data})
            })
            .catch(err => {
                this.setState({status: 'FAILED', response:err.response.data})
            })
    }

    render(){
        let message = null

        if(this.state.status=='PENDING'){
            message = <Loader/>
        }else{
            message = <Message class='Normal-msg' message='this.state.response.toUpperCase()'>
                        </Message>
        }

        

        return(
            <Auxiliary>
                {message}
            </Auxiliary>
        )
    }
}

export default withRouter(Activate);


