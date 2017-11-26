import * as types from '../actions/types'

const initialState = {
    visible: false,
    imageUrl: ''
}

export default function topic(state = initialState, action) {
    switch (action.type) {
        case types.OPEN_TO_LOOK_PICTURE:
            state.visible = true
            state.imageUrl = action.imageUrl
            return Object.assign({}, state);
            break
        case types.CLOSE_TO_LOOK_PICTURE:
            state.visible = false
            state.imageUrl = action.imageUrl
            return Object.assign({}, state);
            break
        default:
            return state
    }
}
