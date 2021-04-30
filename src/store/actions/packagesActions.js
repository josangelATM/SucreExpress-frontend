import * as actionTypes from './actionTypes'


export const updatePackage = (packageUpd) =>{
    return{
        type: actionTypes.UPDATE_PACKAGE,
        packageUpd
    }
}


export const updatePackages = (packages) => {
    return{
        type: actionTypes.UPDATE_PACKAGES,
        packages
    }
} 

export const deletePackages = (id) => {
    return{
        type: actionTypes.DELETE_PACKAGE,
        id
    }
}
