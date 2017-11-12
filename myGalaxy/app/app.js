/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
    AppRegistry,
    StatusBar,
    StyleSheet,
    Text,
    View,
    Platform
} from 'react-native';
import SplashScreen from 'react-native-splash-screen'
import { StackNavigator,TabNavigator,DrawerNavigator } from 'react-navigation';
import CardStackStyleInterpolator from 'react-navigation/src/views/CardStack/CardStackStyleInterpolator';
import Resolution from './common/resolution'
import Login from './pages/login/login'
import Index from './pages/index/index'

export default class App extends Component {
    componentDidMount() {
        // do anything while splash screen keeps, use await to wait for an async task.
        SplashScreen.hide();//关闭启动屏幕
    }
    render() {
        const AppScreen = StackNavigator({
                Login: { screen: Login },
                Index: { screen: Index }
            },
            {

                initialRouteName: 'Login',
                mode: 'card',  // 页面切换模式, 左右是card(相当于iOS中的push效果), 上下是modal(相当于iOS中的modal效果)
                headerMode: 'screen', // 导航栏的显示模式, screen: 有渐变透明效果, float: 无透明效果, none: 隐藏导航栏
                onTransitionStart: ()=>{ console.log('导航栏切换开始'); },  // 回调
                onTransitionEnd: ()=>{ console.log('导航栏切换结束'); },  // 回调
                transitionConfig: (() => ({
                    screenInterpolator: CardStackStyleInterpolator.forHorizontal,
                })),
            });

        const AppNavigation = () => (
            <AppScreen  />
        );

        return (
            <Resolution.FixWidthView style={styles.container}>
                <AppNavigation>
                    <Login/>
                </AppNavigation>
            </Resolution.FixWidthView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
});

