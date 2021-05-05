import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { withRouter } from 'react-router-dom'

const QuoationViewer = (props) =>{
    const [quotation,setQuotation] = useState({})
    const quotationID = props.match.params.quotationID;

    const fetchQuotation = (quotationID) => {
        axios.get(`/quotations/get?type=ID&query=${quotationID}`)
            .then(res =>{
                setQuotation(res.data)
            })
            .catch(err => {
                setQuotation({})
            })
    }

    useEffect(() =>{
        fetchQuotation(quotationID)
    },[quotationID])

    return(
        <div>
        { Object.keys(quotation).map(key =>{
            return(
                <p>{quotation[key]}</p>
            )
        })}
        </div>
    )
}

export default withRouter(QuoationViewer);