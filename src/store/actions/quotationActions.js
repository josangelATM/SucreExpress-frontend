import * as actionTypes from './actionTypes'

export const updateQuotations = (quoations) => {
    return{
        type: actionTypes.UPDATE_QUOTATIONS,
        quoations
    }
} 

export const deleteQuotation = (id) => {
    return{
        type: actionTypes.DELETE_QUOTATION,
        id
    }
} 
