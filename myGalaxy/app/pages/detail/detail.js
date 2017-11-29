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
    WebView
} from 'react-native';
import Loading from '../../common/loading'

export default class Detail extends Component {
    constructor(props){
        super(props);
        this.state = {
            isfreshing: true
        }
    }
    static navigationOptions = ({navigation}) => {
        let detailData = navigation.state.params.data

        return ({
            title: detailData.desc,
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
            headerLeft: <View><TouchableWithoutFeedback
                style={{marginTop: 64, width:100, height:60}}
                onPress={()=>{
                    navigation.goBack()
                }}>
                <Image style={{marginTop:14, marginLeft:24, width:18, height:30}} source={require('../../images/goBack.png')}/>
            </TouchableWithoutFeedback></View>,
            gesturesEnabled: false
        })
    }

    loadComplete = () => {
        this.setState({
            isfreshing: false
        })
    }

    onRenderLoading = () => {
        console.log('loading')
    }

    loadStart = () => {
        this.setState({
            isfreshing: false
        })
        // setTimeout(()=>{
        //     this.setState({
        //         isfreshing: false
        //     })
        // },10000)
    }

    componentWillUnmount() {
        clearTimeout(this.state.isfreshing)
    }

    render() {
        // Navigation = this.props.navigation;
        const {navigation} = this.props
        let detailData = navigation.state.params.data

        return (
            <View style={styles.container}>
                <Loading size={'large'} visible={this.state.isfreshing}/>
                <WebView
                    // ref='webview'
                    style={styles.web}
                    source={{uri: detailData.url}}
                    // onNavigationStateChange  = {(navState) => this._onNavigationStateChange (navState)}
                    automaticallyAdjustContentInsets={true}
                    scalesPageToFit={true}
                    onLoadEnd={this.loadComplete}
                    onLoadStart={this.loadStart}
                    renderLoading={this.onRenderLoading}
                />
            </View>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        // justifyContent: 'center',
        // alignItems: 'center',
        backgroundColor: '#efefef'
    },
    web: {
        position: 'absolute',
        top:0,
        bottom:0,
        left:0,
        right:0,
    }
});



