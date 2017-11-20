import React, { Component } from 'react';
import {
    Platform,
    Image,
    StyleSheet,
    ScrollView,
    View,
    Text,
    TouchableWithoutFeedback,
    ListView,
    RefreshControl
} from 'react-native';
import TopicService from '../../services/topicService'
import TopicItem from './topicItem'
var topicService = new TopicService()
var pages = 1
var listModel = []

export default class TopicListView extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            _dataSource:new ListView.DataSource({
                rowHasChanged:(row1,row2) => row1 !== row2
            }),
            refreshing: false
        };
    }

    componentDidMount() {
        // const {category} = this.props;
        this.getListData()
    }

    getListData = () => {
        const {category} = this.props;
        let self = this
        let model = []
        pages = 1
        let params = {}
        params.category = category
        params.count = 10
        params.pages = pages
        self.setState(
            {
                refreshing: true
            }
        )
        topicService.fetchCategoryList(params).then(
            (res) => {
                console.log(params)
                if (res.error === false)
                {
                    let results = res.results
                    results.forEach(function (v) {
                        model.push(v)
                    })
                }
                let _ds = JSON.parse(JSON.stringify(model))
                self.setState(
                    {
                        refreshing: false,
                        _dataSource: self.state._dataSource.cloneWithRows(_ds)
                    }
                )
            }
        )

    }

    getEndReached = () => {
        const {category} = this.props;
        let self = this
        let model = []
        pages = pages + 1
        let params = {}
        if (params.category !== category)
        {
            listModel = []
            // this.refs.listView.scrollTo(0, 0)
        }
        params.category = category
        params.count = 10
        params.pages = pages
        self.setState(
            {
                refreshing: true
            }
        )
        topicService.fetchCategoryList(params).then(
            (res) => {
                console.log(params)
                if (res.error === false)
                {
                    let results = res.results
                    results.forEach(function (v) {
                        listModel.push(v)
                    })
                }
                // model.forEach(function (v) {
                //     listModel.push(v)
                // })
                let _ds = JSON.parse(JSON.stringify(listModel))
                console.log(_ds)
                self.setState(
                    {
                        _dataSource: self.state._dataSource.cloneWithRows(_ds)
                    }
                )
            }
        )
        self.setState(
            {
                refreshing: false
            }
        )
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
            <TopicItem rowData={rowData}/>
        );
    }

    render() {
        const {category} = this.props;
        // console.log(category)
        return(

            <ListView
                ref={"listView"}
                scrollsToTop={true}
                dataSource={this.state._dataSource}
                renderRow={this.renderListItem}
                enableEmptySections={true}
                refreshControl={
                    <RefreshControl
                        refreshing={this.state.refreshing}
                        onRefresh={this.getListData}
                    />
                }
                onEndReached={this.getEndReached}
            />
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
    }
});