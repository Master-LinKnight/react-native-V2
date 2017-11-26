import {combineReducers} from 'redux';
import topic from './topic'
import image from './image'

const rootReducer = combineReducers({
    topic,
    image
})

export default rootReducer;