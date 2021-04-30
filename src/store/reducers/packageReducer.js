import * as actionTypes from '../actions/actionTypes'

const initialState = {
    currentPackages:[]
}
 
const updatePackages = (state, action) => {
    return{
        ...state,
        currentPackages: action.packages
    }

}

const updatePackage = (state,action) => {
    console.log(action.packageUpd.id)
    console.log(state.currentPackages)
    return{
        ...state
    }
}

const deletePackage = (state, action) => {
    return {  
        ...state, 
        currentPackages: state.currentPackages.filter(item => item.id !== action.id) 
    }
}


const packageReducer = (state = initialState, action) => {
    
    switch(action.type){
        case (actionTypes.UPDATE_PACKAGES): return updatePackages(state,action); break;
        case (actionTypes.DELETE_PACKAGE): return deletePackage(state,action); break;
        case (actionTypes.UPDATE_PACKAGE): return updatePackage(state,action); break;
        default: return state;
    }
    
}

export default packageReducer;

