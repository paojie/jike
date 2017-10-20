import {
    combineReducers
} from 'redux'
import {
    RECEIVE_USER,
    LOG_IN,
    LOG_OUT
} from '../constants/userinfo'


function user(state = {}, action) {
    switch (action.type) {
        case LOG_IN:
            return action.user;
        case LOG_OUT:
            return {};
        case RECEIVE_USER:
            return action.user;
        default:
            return state;
    }
}

const rootReducer = combineReducers({
    user
})

export default rootReducer