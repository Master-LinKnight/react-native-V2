import * as types from '../actions/types'

const defaultState = {
    isRefreshing: false,
    isFirstLoaded: true,
    isLoadMore: false,
    noMore: false,
    index: 1,
    rankList: []
}
const initialState = []
initialState["瞎推荐"] = Object.assign({}, defaultState)
initialState["App"] = Object.assign({}, defaultState)
initialState["Android"] = Object.assign({}, defaultState)
initialState["iOS"] = Object.assign({}, defaultState)
initialState["休息视频"] = Object.assign({}, defaultState)
initialState["福利"] = Object.assign({}, defaultState)
initialState["拓展资源"] = Object.assign({}, defaultState)
initialState["前端"] = Object.assign({}, defaultState)

export default function topic(state = initialState, action) {
    switch (action.type) {
        case types.FETCH_ARTICLE_LIST:
            state[action.category].isRefreshing = action.isRefreshing
            return Object.assign({}, state);
            break
        case types.RECEIVE_ARTICLE_LIST:
            state[action.category].isRefreshing = action.isRefreshing
            state[action.category].rankList = action.rankList;
            state[action.category].isFirstLoaded = false;
            return Object.assign({}, state);
            break
        case types.RECEIVE_ARTICLE_LIST_MORE:
            state[action.category].isRefreshing = action.isRefreshing;
            state[action.category].rankList = state[action.category].rankList.concat(action.rankList);
            state[action.category].index = state[action.category].index + 1;
            return Object.assign({}, state);
            break
        default:
            return state
    }
}