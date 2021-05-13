import { combineReducers } from 'redux'
import userReducer from './userReducer'
import packageReducer from './packageReducer'
import requestReducer from './requestReducer'
import quotationReducer from './quotationReducer'
import billReducer from './billReducer'
const rootReducer = combineReducers({
    auth: userReducer,
    package: packageReducer,
    request: requestReducer,
    quotation: quotationReducer,
    bill: billReducer
})

export default rootReducer;