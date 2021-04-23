import * as actionTypes from '../actions/actionTypes'

const initialState = {
    currentQuotations:[]
}
 
const updateQuoations = (state, action) => {
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
        case (actionTypes.UPDATE_QUOTATIONS): return updateQuoations(state,action); break;
        case (actionTypes.DELETE_QUOTATION): return deleteQuotation(state,action); break;
        default: return state;
    }
    
}

export default quotationReducer;

