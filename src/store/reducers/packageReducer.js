import * as actionTypes from '../actions/actionTypes'
import {formatDate} from '../../helpers/helpers'

const initialState = {
    currentPackages:[]
}
 
const updatePackages = (state, action) => {
    const regexForDate = new RegExp('\\d{4}-\\d{2}-\\d{2}T')

    for (let item of action.packages){
        for (let key in item) {
            if(regexForDate.test(item[key])){
                item[key] = formatDate(item[key])
            }
            
          }
    }

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

