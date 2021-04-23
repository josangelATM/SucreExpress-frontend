import * as actionTypes from '../actions/actionTypes'

const initialState = {
    currentRequests:[]
}
 
const updateRequests = (state, action) => {
    return{
        ...state,
        currentRequests: action.requests
    }

}

const deleteRequest = (state, action) => {
    return {  
        ...state, 
        currentRequests: state.currentRequests.filter(item => item.id !== action.id) 
    }
}


const requestReducer = (state = initialState, action) => {
    
    switch(action.type){
        case (actionTypes.UPDATE_REQUESTS): return updateRequests(state,action); break;
        case (actionTypes.DELETE_REQUEST): return deleteRequest(state,action); break;
        default: return state;
    }
    
}

export default requestReducer;

