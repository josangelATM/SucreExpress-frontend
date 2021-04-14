import { combineReducers } from 'redux'
import userReducer from './userReducer'
import packageReducer from './packageReducer'

const rootReducer = combineReducers({
    auth: userReducer,
    package: packageReducer
})

export default rootReducer;