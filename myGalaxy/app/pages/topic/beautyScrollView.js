import React, { Component } from 'react';
import {
    Platform,
    Image,
    StyleSheet,
    ScrollView,
    View,
    Text,
    TouchableWithoutFeedback,
    InteractionManager,
    Dimensions,
    ListView,
    ActivityIndicator,
    RefreshControl
} from 'react-native';
import TopicService from '../../services/topicService'
import TopicItem from './topicItem'
import {fetchArticle} from '../../actions/topic'
import Loading from '../../common/loading'
// var topicService = new TopicService()

export default class BeautyScrollView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            _dataSource:new ListView.DataSource({
                rowHasChanged:(row1,row2) => row1 !== row2
            }),
        };
        // this.getListData = this.getListData.bind(this)
        // this.getEndReached = this.getEndReached.bind(this)
    }

    componentWillMount() {
        this.getListData()
    }

    getListData = () => {
        InteractionManager.runAfterInteractions(() => {
            const {dispatch, topic, category} = this.props
            dispatch(fetchArticle(category));
        })
    }

    getEndReached = (dispatch, topicModel, category, e: Object) => {
        var offsetY = e.nativeEvent.contentOffset.y; //滑动距离
        var contentSizeHeight = e.nativeEvent.contentSize.height; //scrollView contentSize高度
        var oriageScrollHeight = e.nativeEvent.layoutMeasurement.height; //scrollView高度
        if (offsetY + oriageScrollHeight >= contentSizeHeight) {
            if (typeof(topicModel) == 'undefined' || topicModel.isFirstLoaded || topicModel.isRefreshing) {
                return;
            }

            InteractionManager.runAfterInteractions(() => {
                dispatch(fetchArticle(category, topicModel.index + 1, true, topicModel));
            });
        }
    }

    onClickImage = (item) => {

    }

    render() {
        const {dispatch, topic, category} = this.props
        let topicModel = {}
        topicModel = topic[category]
        let isFirstLoaded = topicModel.rankList.length == 0
        let map_1 = []
        let map_2 = []
        topicModel.rankList.map(function (item, i) {
            if (i%2 == 0)
            {
                map_2.push(item)
            }
            else
            {
                map_1.push(item)
            }
        })

        const content_1 = map_1.map(function (item, i) {
            const imageView = (
                <TouchableWithoutFeedback onPress={this.onClickImage.bind(item)}>
                    <Image key={i+'_'+item.id} style={[{height:parseInt(Math.random() * 20 + 24) * 10},styles.image]} source={{uri:item.url}}/>
                </TouchableWithoutFeedback>
                )
            return imageView
        })
        const content_2 = map_2.map(function (item, i) {
            const imageView = (
                <TouchableWithoutFeedback onPress={this.onClickImage.bind(item)}>
                    <Image key={i+'_'+item.id} style={[{height:parseInt(Math.random() * 20 + 24) * 10},styles.image]} source={{uri:item.url}}/>
                </TouchableWithoutFeedback>
            )
            return imageView
        })

        console.log(topicModel.isRefreshing)
        return(
            <ScrollView
                onMomentumScrollEnd={this.getEndReached.bind(this, dispatch, topicModel, category)}
            >
                <Loading visible={topicModel.isRefreshing}/>
                <View style = {{flexDirection : 'row', justifyContent: 'space-around'}}>
                    <View>
                        {content_1}
                    </View>
                    <View>
                        {content_2}
                    </View>
                </View>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    base:{
        alignItems:'center',
        justifyContent: 'center',
        position: 'absolute',
        top:0,
        bottom:0,
        left:0,
        right:0,
        // backgroundColor: '#efefef'
    },
    image: {
        width: 310,
        marginTop: 10,
        borderRadius: 10
    }
});