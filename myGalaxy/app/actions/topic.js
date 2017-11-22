import * as types from './types'
import TopicService from '../services/topicService'
var topicService = new TopicService()

export function fetchArticle(category = '瞎推荐', index = 1, isLoadMore, topicModel) {
    return dispatch => {
        if (!isLoadMore) {
            dispatch(fetchArticleList(category))
        }
        let params = {}
        params.category = category
        params.count = types.COUNT
        params.pages = index
        topicService.fetchCategoryList(params).then(
            (res) => {
                if(!isLoadMore){
                    dispatch(receiveArticleList(res.results,category))
                } else {
                    dispatch(receiveArticleListMore(res.results, category, topicModel))
                }
            }
        ).catch((error) => {
            console.log(error)
        }).done()
    }
}

function fetchArticleList(category) {
    return {
        type: types.FETCH_ARTICLE_LIST,
        category: category,
        isRefreshing: true
    }
}

function receiveArticleList(rankList,category) {
    return {
        type: types.RECEIVE_ARTICLE_LIST,
        isRefreshing: false,
        category: category,
        rankList: rankList
    }
}

function receiveArticleListMore(rankList, category, topicModel) {
    return {
        type: types.RECEIVE_ARTICLE_LIST_MORE,
        isRefreshing: false,
        category: category,
        topicModel : topicModel,
        rankList: rankList
    }
}