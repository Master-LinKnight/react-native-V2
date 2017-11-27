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

    static navigationOptions = ({navigation}) => {
        return ({
            title:'关于App',
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

    componentWillMount() {
        this._isMounted = true
    }

    componentWillUnmount() {
        this._isMounted = false
    }

    onItemClick = () => {
        const {navigation} = this.props
        navigation.navigate('Detail', {data: {
            desc: 'myGalaxy源码地址',
            url: 'https://github.com/MK-LinKnight/react-native-V2'
        }})
    }

    render() {
        // Navigation = this.props.navigation;

        return (
            <View style={styles.container}>
                <Image style={styles.image} source={require('../../images/react.png')}/>
                <Text style={styles.welcome}>
                    欢迎使用myGalaxy!
                </Text>
                <Text style={styles.instructions}>
                    感兴趣的同学{'\n'}可以访问GitHub地址获取源码
                </Text>
                <TouchableWithoutFeedback onPress={this.onItemClick}>
                    <View>
                        <Text style={[styles.instructions, {textDecorationLine: 'underline'}]}>
                            https://github.com/MK-LinKnight/react-native-V2
                        </Text>
                    </View>
                </TouchableWithoutFeedback>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        // justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#efefef'
    },
    image: {
        height: 250,
        width: 250,
        marginTop: 150,

    },
    welcome: {
        fontSize: 40,
        textAlign: 'center',
        color: '#666666',
        marginTop: 80,
    },
    instructions: {
        fontSize: 24,
        textAlign: 'center',
        color: '#999999',
        marginTop: 10,
    },
});



