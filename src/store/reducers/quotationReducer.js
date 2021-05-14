import * as actionTypes from '../actions/actionTypes'
import {formatDate} from '../../helpers/helpers'
const initialState = {
    currentQuotations:[]
}
 
const updateQuoations = (state, action) => {
    const regexForDate = new RegExp('\\d{4}-\\d{2}-\\d{2}T')

    for (let item of action.quoations){
        for (let key in item) {
            if(regexForDate.test(item[key])){
                item[key] = formatDate(item[key])
            }
            
          }
    }
    return{
        ...state,
        currentQuotations: action.quoations
    }

}

const deleteQuotation = (state, action) => {
    return {  
        ...state, 
        currentQuotations: state.currentQuotations.filter(item => item.id !== action.id) 
    }
}


const quotationReducer = (state = initialState, action) => {
    
    switch(action.type){
        case (actionTypes.UPDATE_QUOTATIONS): return updateQuoations(state,action);
        case (actionTypes.DELETE_QUOTATION): return deleteQuotation(state,action);
        default: return state;
    }
    
}

export default quotationReducer;

