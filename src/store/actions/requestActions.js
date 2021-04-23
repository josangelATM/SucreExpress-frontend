import * as actionTypes from './actionTypes'

export const updateRequests = (requests) => {
    return{
        type: actionTypes.UPDATE_REQUESTS,
        requests
    }
} 

export const deleteRequest = (id) => {
    return{
        type: actionTypes.DELETE_REQUEST,
        id
    }
} 
