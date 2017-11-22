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
    ProgressBarAndroid,
    ListView,
    ActivityIndicator,
    RefreshControl
} from 'react-native';
import TopicService from '../../services/topicService'
import TopicItem from './topicItem'
import {fetchArticle} from '../../actions/topic'
import Loading from '../../common/loading'
// var topicService = new TopicService()

export default class TopicListView extends React.Component {
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

    getEndReached = (dispatch, topicModel, category, index) => {
        // console.log('test',topicModel)
        if(typeof(topicModel) == 'undefined' || topicModel.isFirstLoaded || topicModel.isRefreshing){
            return;
        }

        InteractionManager.runAfterInteractions(() => {
            dispatch(fetchArticle(category, topicModel.index + 1, true, topicModel));
        });
    }

    onTextLayout(event){
        let descHeight = event.nativeEvent.layout.height;
        let totalHeight = descHeight + 30 > 110 ? descHeight + 45 : 110

        this.refs.item.setNativeProps({
            style:{
                height:totalHeight,
                backgroundColor: 'white',
                margin:20,
                marginBottom: 0,
                shadowOffset: {width: 5, height: 5},
                shadowColor: 'black',
                shadowOpacity: 0.4,
                shadowRadius: 5
            }
        });
    }

    renderListItem = (rowData, sectionID, rowID, highlightRow) => {
        return(
            <TopicItem rowData={rowData} {...this.props}/>
        );
    }

    renderFooter(isFirstLoaded){
        if(isFirstLoaded){
            return;
        }

        if (Platform.OS === 'ios') {
            return (
                <View style={styles.progress}>
                    <ActivityIndicator size={'large'}/>
                </View>
            );
        }else {
            return (
                <View style={styles.progress}>
                    <ProgressBarAndroid />
                </View>
            );
        }
    }

    render() {
        const {dispatch, topic, category} = this.props
        let topicModel = {}
        topicModel = topic[category]
        let isFirstLoaded = topicModel.rankList.length == 0
        return(
            <View>
                <Loading visible={(topicModel.isFirstLoaded && topicModel.isRefreshing)}/>
                <ListView
                    ref={"listView"}
                    dataSource={this.state._dataSource.cloneWithRows(topicModel.rankList)}
                    renderRow={this.renderListItem}
                    enableEmptySections={true}
                    renderFooter={this.renderFooter.bind(this, isFirstLoaded)}
                    initialListSize={10}
                    onEndReachedThreshold={10}
                    pageSize={topicModel.rankList.length}
                    refreshControl={
                        <RefreshControl
                            refreshing={topicModel.isRefreshing}
                            onRefresh={this.getListData}
                        />
                    }
                    onEndReached={this.getEndReached.bind(this, dispatch, topicModel, category)}
                />
            </View>
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
    tabText: {
        marginTop: 30,
        fontSize: 30
    },
    listItem: {
        height: 110,
        backgroundColor: 'white',
        margin:20,
        marginBottom: 0,
        shadowOffset: {width: 5, height: 5},
        shadowColor: 'black',
        shadowOpacity: 0.4,
        shadowRadius: 5
    },
    listItemText: {
        fontSize: 24,
        marginTop: 24,
        marginLeft: 24,
        color: '#999999'
    },
    progress:{
        marginVertical: 20,
        paddingBottom: 20,
        alignSelf: 'center'
    },
});