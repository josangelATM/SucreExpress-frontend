import { combineReducers } from 'redux'
import userReducer from './userReducer'
import packageReducer from './packageReducer'
import requestReducer from './requestReducer'
import quotationReducer from './quotationReducer'
const rootReducer = combineReducers({
    auth: userReducer,
    package: packageReducer,
    request: requestReducer,
    quotation: quotationReducer
})

export default rootReducer;