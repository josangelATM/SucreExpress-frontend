import * as actionTypes from '../actions/actionTypes'

const user = JSON.parse(localStorage.getItem('user'))

const initialState = user ? {isLogged: true, isAdmin: user.type==='admin' || user.type==='superadmin' ? true:false, isSuperAdmin: user.type==='superadmin' ? true:false, user} : {isLogged: false, isAdmin: false, isSuperAdmin: false, user: null}
 
const login = (state, action) => {
    return{
        ...state,
        isLogged: true,
        isAdmin: (action.user.type==='admin' || action.user.type==='superadmin') ? true:false,
        isSuperAdmin: action.user.type==='superadmin' ? true:false,
        user:action.user
    }

}

const logout = (state, action) => {
    return{
        ...state,
        isLogged: false,
        isAdmin: false,
        isSuperAdmin: false,
        user:null
    }

}


const userReducer = (state = initialState, action) => {
    switch(action.type){
        case (actionTypes.LOGIN): return login(state,action); 
        case (actionTypes.LOGOUT): return logout(state,action);
        default: return state;
    }
    

}

export default userReducer;

