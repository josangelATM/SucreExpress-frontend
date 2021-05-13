import * as actionTypes from '../actions/actionTypes'


const initialState = {
    customer:{},
    packages:[],
    lblPrice: 0.00,
    billID:'',
    total:0.00,
    discount:0.00
}

const setTotalPrice = (state,action) =>{
    let sum = 0.00
    state.packages.forEach(item=>{
        sum+= parseFloat(item.price)
    })
    return{
        ...state,
        total:sum.toFixed(2)-state.discount
    }
}

 
const updateCustomer = (state, action) => {
    
    return{
        ...state,
        customer: action.customer
    }

}

const addPackage = (state, action) => {
    return {  
        ...state, 
        packages: [...state.packages, action.newPackage]
    }
}


const deletePackage = (state, action) => {
    return {  
        ...state, 
        packages: state.packages.filter(item => item.id !== action.id) 
    }
}

const setLblPrice = (state,action) =>{
    return{
        ...state,
        lblPrice: action.lblPrice,
        packages: state.packages.map(item=> (
            {...item,price: (parseInt(item.weight) * action.lblPrice).toFixed(2)}
        ))
    }
}


const setBillID = (state,action) =>{
    return{
        ...state,
        billID: `SE-${action.billID}`
    }
}

const setDiscount = (state,action) =>{
    return{
        ...state,
        discount: action.discount
    }
}

const deleteAllPackages = (state,action) =>{
    return{
        ...state,
        packages:[]
    }
}

const billReducer = (state = initialState, action) => {
    
    switch(action.type){
        case (actionTypes.UPDATE_CUSTOMER): return updateCustomer(state,action); 
        case (actionTypes.ADD_PACKAGE_BILL): return addPackage(state,action);
        case (actionTypes.DELETE_PACKAGE_BILL): return deletePackage(state,action);
        case (actionTypes.SET_LBL_PRICE): return setLblPrice(state,action);
        case (actionTypes.SET_BILL_ID): return setBillID(state,action);
        case (actionTypes.SET_TOTAL): return setTotalPrice(state,action);
        case (actionTypes.SET_DISCOUNT): return setDiscount(state,action);
        case (actionTypes.DELETE_ALL_PACKAGES_BILL): return deleteAllPackages(state,action);
        default: return state;
    }
    
}

export default billReducer;

