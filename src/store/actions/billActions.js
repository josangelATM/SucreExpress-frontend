import * as actionTypes from './actionTypes'


export const updateCustomer = (customer) =>{
    return{
        type: actionTypes.UPDATE_CUSTOMER,
        customer
    }
}


export const addPackage = (newPackage) => {
    return{
        type: actionTypes.ADD_PACKAGE_BILL,
        newPackage
    }
} 

export const deletePackage = (id) => {
    return{
        type: actionTypes.DELETE_PACKAGE_BILL,
        id
    }
}

export const setLblPrice = (lblPrice) => {
    return{
        type: actionTypes.SET_LBL_PRICE,
        lblPrice
    }
}

export const setBillID = (billID) =>{
    return{
        type: actionTypes.SET_BILL_ID,
        billID
    }
}


export const setTotal = () =>{
    return{
        type: actionTypes.SET_TOTAL
    }
}

export const setDiscount = (discount) =>{
    return{
        type: actionTypes.SET_DISCOUNT,
        discount
    }
}