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
import Resolution from './common/resolution'
import Router from './router'
import {Provider} from 'react-redux'
import configureStore from './store/configure-store'
const store = configureStore()

export default class App extends Component {
    componentDidMount() {
        // do anything while splash screen keeps, use await to wait for an async task.
        SplashScreen.hide();//关闭启动屏幕
    }
    render() {
        return (
            <Provider store={store}>
                <Resolution.FixWidthView style={styles.container}>
                    <Router/>
                </Resolution.FixWidthView>
            </Provider>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    }
});

