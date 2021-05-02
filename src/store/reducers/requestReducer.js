import * as actionTypes from '../actions/actionTypes'
import {formatDate} from '../../helpers/helpers'
const initialState = {
    currentRequests:[]
}
 
const updateRequests = (state, action) => {
    const regexForDate = new RegExp('\\d{4}-\\d{2}-\\d{2}T')

    for (let item of action.requests){
        for (let key in item) {
            if(regexForDate.test(item[key])){
                item[key] = formatDate(item[key])
            }
            
          }
    }
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

