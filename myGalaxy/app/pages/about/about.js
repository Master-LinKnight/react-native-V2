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

export default class About extends Component {
    constructor(props){
        super(props);

    }

    render() {
        // Navigation = this.props.navigation;

        return (
            <View style={styles.container}>
                <Text style={styles.welcome}>
                    欢迎使用myGalaxy!
                </Text>
                <Text style={styles.instructions}>
                    感兴趣的同学{'\n'}可以访问GitHub地址获取源码
                </Text>
                <Text style={styles.instructions}>
                    https://github.com/MK-LinKnight/react-native-V2
                </Text>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#efefef'
    },
    welcome: {
        fontSize: 40,
        textAlign: 'center',
        color: '#666666',
        margin: 10,
    },
    instructions: {
        fontSize: 24,
        textAlign: 'center',
        color: '#999999',
        marginTop: 10,
    },
});



