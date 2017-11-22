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
import { StackNavigator,TabNavigator,DrawerNavigator,addNavigationHelpers } from 'react-navigation';
import CardStackStyleInterpolator from 'react-navigation/src/views/CardStack/CardStackStyleInterpolator';
import Login from './pages/login/login'
import Index from './pages/index/index'
import Detail from "./pages/detail/detail";
import Topic from './pages/topic/topic'
import Movie from './pages/movie/movie'
import About from './pages/about/about'
import TabBarItem from './common/tabBarItem'
import {connect} from 'react-redux';

class Router extends Component {
    render() {
    const TabScreen = TabNavigator({
            Topic: {
                screen: Topic,
                navigationOptions: {
                    tabBarLabel: '话题广场',
                    tabBarIcon: ({focused}) => (
                        <TabBarItem focused={focused} style={styles.tabBarIcon} normalImage={require('./images/topic.png')} selectedImage={require('./images/topic-active.png')}/>
                    )
                }
            },
            Movie: {
                screen: Movie,
                navigationOptions: {
                    tabBarLabel: '电影院线',
                    tabBarIcon: ({focused}) => (
                        <TabBarItem focused={focused} style={styles.tabBarIcon} normalImage={require('./images/movie.png')} selectedImage={require('./images/movie-active.png')}/>
                    )
                }
            },
            About: {
                screen: About,
                navigationOptions: {
                    tabBarLabel: '关于App',
                    tabBarIcon: ({focused}) => (
                        <TabBarItem focused={focused} style={[styles.tabBarIcon,{marginBottom: 24}]} normalImage={require('./images/about.png')} selectedImage={require('./images/about-active.png')}/>
                    )
                }
            }
        },
        {
            animationEnabled: true,
            lazy: true,
            swipeEnabled: false,
            tabBarPosition: 'bottom',
            tabBarOptions: {
                activeTintColor: '#3b5597',
                // activeBackgroundColor: '#3b5597',
                inactiveTintColor: '#8a8a8a',
                showIcon: true,
                indicatorStyle: {
                    opacity: 0
                },
                tabStyle: {
                    padding: 0,
                    alignItems: 'center',
                    justifyContent: 'flex-end',
                },
                labelStyle: {
                    marginBottom: 10,
                    fontSize: 24 // 文字大小
                },
                style: {
                    // backgroundColor: 'rgba(255,255,255,0.1)', // TabBar 背景色
                    backgroundColor: '#ffffff',
                    height: 100
                }
            },
            backBehavior: 'none',
        });
        const AppScreen = StackNavigator({
                Login: {
                    screen: Login,
                    path: '/pages/Login'
                },
                Index: {
                    screen: TabScreen,
                    path: '/pages/Index'
                },
                Detail: {
                    screen: Detail,
                    path: '/pages/Detail'
                }
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
            <AppNavigation>
                <Login/>
            </AppNavigation>
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
    tabBarIcon: {
        height: 45,
        width: 45,
        marginBottom: 30
    }
});

// function mapStateToProps(state) {
//     const { router } = state
//     return {
//         router
//     }
// }
// export default connect(mapStateToProps)(Router)

export default Router

