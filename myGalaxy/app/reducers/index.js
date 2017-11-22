import {combineReducers} from 'redux';
import topic from './topic'
import router from './router'

const rootReducer = combineReducers({
    topic,
    router
})

export default rootReducer;