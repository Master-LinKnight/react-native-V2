import * as types from '../actions/types'

const initialState = {
    router: '',
    params: {}
}

export default function router(state = initialState, action) {
    switch (action.type) {
        case types.GOBACK_PAGE:
            state.router = action.router
            // state.params = action.params
            return state
            break
        case types.SKIP_PAGE:
            state.router = action.router
            state.params = action.params
            return state
            break
        default:
            return state
    }
}
