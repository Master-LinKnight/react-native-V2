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
    TouchableWithoutFeedback,
} from 'react-native';
import { StackNavigator,TabNavigator,DrawerNavigator } from 'react-navigation';
import Topic from '../topic/topic'
import Movie from '../movie/movie'
import About from '../about/about'
import TabBarItem from './tabBarItem'
// import Drawer from 'react-native-drawer'

export default class Index extends Component {
    constructor(props){
        super(props);

    }
    static navigationOptions = ({navigation}) => {
        return ({
            title:'Playground',
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

    render() {
        const TabScreen = TabNavigator({
                Topic: {
                    screen: Topic,
                    navigationOptions: {
                        tabBarLabel: '话题广场',
                        tabBarIcon: ({focused}) => (
                            <TabBarItem focused={focused} style={styles.tabBarIcon} normalImage={require('../../images/topic.png')} selectedImage={require('../../images/topic-active.png')}/>
                        )
                    }
                },
                Movie: {
                    screen: Movie,
                    navigationOptions: {
                        tabBarLabel: '电影院线',
                        tabBarIcon: ({focused}) => (
                            <TabBarItem focused={focused} style={styles.tabBarIcon} normalImage={require('../../images/movie.png')} selectedImage={require('../../images/movie-active.png')}/>
                        )
                    }
                },
                About: {
                    screen: About,
                    navigationOptions: {
                        tabBarLabel: '关于App',
                        tabBarIcon: ({focused}) => (
                            <TabBarItem focused={focused} style={[styles.tabBarIcon,{marginBottom: 24}]} normalImage={require('../../images/about.png')} selectedImage={require('../../images/about-active.png')}/>
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
        const DrawerScreen = () => {
            return <View />
        }
        const drawerStyles = {
            drawer: { shadowColor: '#0000ff', shadowOpacity: 0.8, shadowRadius: 3},
            main: {paddingLeft: 0},
        }

        return (
            <View style={styles.container}>
                <TabScreen/>
                {/* <Drawer
                    type='displace'
                    content={<DrawerScreen />}
                    tapToClose={true}
                    panOpenMask={0.3}
                    openDrawerOffset={0.3} // 20% gap on the right side of drawer
                    panCloseMask={0.3}
                    closedDrawerOffset={0}
                    styles={drawerStyles}
                    tweenHandler={(ratio) => ({main: { opacity:(2-ratio)/2 }})}>
                    <TabScreen/>
                </Drawer> */}
            </View>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#efefef'
    },
    tabBarIcon: {
        height: 45,
        width: 45,
        marginBottom: 30
    }
});



