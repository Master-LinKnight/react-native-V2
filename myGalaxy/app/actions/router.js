import * as types from './types'

export function routerPage(router, params, isGoBack) {
    return dispatch => {
        if (isGoBack) {
            dispatch(goBackPage(router))
        }
        else {
            dispatch(skipToPage(router, params))
        }
    }
}

function skipToPage(router, params) {
    return {
        type: types.SKIP_PAGE,
        router: router,
        params: params
    }
}

function goBackPage(router) {
    return {
        type: types.GOBACK_PAGE,
        router: router,
    }
}
