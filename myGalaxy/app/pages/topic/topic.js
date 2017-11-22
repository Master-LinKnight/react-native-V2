/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
    Platform,
    Image,
    StyleSheet,
    ScrollView,
    View,
    Text,
    TouchableWithoutFeedback,
} from 'react-native';
import ScrollableTabView, {DefaultTabBar,ScrollableTabBar } from 'react-native-scrollable-tab-view';
import {connect} from 'react-redux';
import TopicService from '../../services/topicService'
import TopicListView from './topicListView'

var tabModel = ['瞎推荐','App','Android','iOS','休息视频','福利','拓展资源','前端']  //Android | iOS | 休息视频 | 福利 | 拓展资源 | 前端 | 瞎推荐 | App
class Topic extends Component {
    constructor(props){
        super(props);

    }

    static navigationOptions = ({navigation}) => {
        return ({
            title:'话题广场',
            headerTitleStyle: {
                color: '#ffffff',
                fontSize: 36,
                textAlign: 'center',
                marginTop: 16,
            },
            headerStyle: {
                backgroundColor: '#3b5597',
                height: 132
            },
            headerTintColor: '#ffffff',
            headerBackTitle: null,
            headerLeft: null,
            gesturesEnabled: false
        })
    }

    componentDidMount()
    {

    }

    render() {
        // Navigation = this.props.navigation;
        // const content = viewModel.map(function (typeId) {
        //     const name = typeId;
        //     const typeView = (
        //         <View key={typeId} tabLabel={name} style={styles.base}>
        //             <Text style={styles.tabText}>{"First"}</Text>
        //             <Text style={styles.tabText}>{name}</Text>
        //         </View>
        //     );
        //     return typeView;
        // });

        return (
            <View style={styles.container}>
                <ScrollableTabView
                    style={{flex: 1}}
                    tabBarPosition='top'
                    initialPage={0}
                    locked={true}
                    renderTabBar={() => <ScrollableTabBar style={{height: 80}} tabStyle={styles.tab} textStyle={styles.tabText}/>}
                    tabBarBackgroundColor={'#ffffff'}
                    tabBarUnderlineColor={'#3b5597'}
                    tabBarInactiveTextColor={'#8a8a8a'}
                    tabBarActiveTextColor={'#3b5597'}
                >
                    <TopicListView key={0} tabLabel={tabModel[0]} style={styles.base} category={tabModel[0]} {...this.props}/>
                    <TopicListView key={1} tabLabel={tabModel[1]} style={styles.base} category={tabModel[1]} {...this.props}/>
                    <TopicListView key={2} tabLabel={tabModel[2]} style={styles.base} category={tabModel[2]} {...this.props}/>
                    <TopicListView key={3} tabLabel={tabModel[3]} style={styles.base} category={tabModel[3]} {...this.props}/>
                    <TopicListView key={4} tabLabel={tabModel[4]} style={styles.base} category={tabModel[4]} {...this.props}/>
                    <TopicListView key={5} tabLabel={tabModel[5]} style={styles.base} category={tabModel[5]} {...this.props}/>
                    <TopicListView key={6} tabLabel={tabModel[6]} style={styles.base} category={tabModel[6]} {...this.props}/>
                    <TopicListView key={7} tabLabel={tabModel[7]} style={styles.base} category={tabModel[7]} {...this.props}/>
                </ScrollableTabView>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#efefef'
    },
    base:{
        alignItems:'center',
        justifyContent: 'center',
        position: 'absolute',
        top:0,
        bottom:0,
        left:0,
        right:0
    },
    tab: {
        // alignItems:'center',
        // justifyContent: 'center',
        paddingBottom: 0
    },
    tabText: {
        marginTop: 30,
        fontSize: 30
    },
    textStyle: {
        flex: 1,
        fontSize:20,
        marginTop:20,
        textAlign:'center',
    },
});

function mapStateToProps(state) {
    const { topic } = state
    return {
        topic
    }
}
export default connect(mapStateToProps)(Topic)



