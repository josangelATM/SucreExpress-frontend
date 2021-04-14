import * as actionTypes from '../actions/actionTypes'

const user = JSON.parse(localStorage.getItem('user'))

const initialState = user ? {isLogged: true, isAdmin: user.type==='admin' ? true:false, user} : {isLogged: false, isAdmin: false, user: null}
 
const login = (state, action) => {
    return{
        ...state,
        isLogged: true,
        isAdmin: action.user.type==='admin' ? true:false,
        user:action.user
    }

}

const logout = (state, action) => {
    return{
        ...state,
        isLogged: false,
        isAdmin: false,
        user:null
    }

}


const userReducer = (state = initialState, action) => {

    switch(action.type){
        case (actionTypes.LOGIN): return login(state,action); break;
        case (actionTypes.LOGOUT): return logout(state,action); break;
        default: return state;
    }
    

}

export default userReducer;

