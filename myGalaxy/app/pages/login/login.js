/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
    Platform,
    StyleSheet,
    Animated,
    Keyboard,
    KeyboardAvoidingView,
    StatusBar,
    Image,
    TextInput,
    View,
    Text,
    TouchableWithoutFeedback,
    InteractionManager
} from 'react-native';
// import Resolution from './common/resolution'
import _logo from '../../images/react.png'
var LOGO_MAX = 450
var LOGO_MIN = 250
var Navigation
export default class Login extends Component {
    static navigationOptions = ({navigation}) => {
        return ({
            header: null
        })
    }
    constructor(props) {
        super(props);

        this.imageHeight = new Animated.Value(LOGO_MAX);
        this.imageWidth = new Animated.Value(LOGO_MAX);
        this.state = {
            isBlock: true
        }
        this.pswBlock = this.pswBlock.bind(this)
    }

    // componentDidMount() {
    //     SplashScreen.hide();//关闭启动屏幕
    // }

    componentWillMount () {
        if (Platform.OS === 'ios')
        {
            this.keyboardWillShowSub = Keyboard.addListener('keyboardWillShow', this.keyboardWillShow);
            this.keyboardWillHideSub = Keyboard.addListener('keyboardWillHide', this.keyboardWillHide);
        }
        else
        {
            this.keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', this.keyboardDidShow);
            this.keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', this.keyboardDidHide);
        }
    }

    componentWillUnmount() {
        if (Platform.OS === 'ios')
        {
            this.keyboardWillShowSub.remove();
            this.keyboardWillHideSub.remove();
        }
        else
        {
            this.keyboardDidShowListener.remove();
            this.keyboardDidHideListener.remove();
        }
    }

    keyboardWillShow = (event) => {
        // console.log('keyboardWillShow')
        InteractionManager.runAfterInteractions(() => {
            Animated.timing(this.imageHeight, {
                duration: event.duration,
                toValue: LOGO_MIN,
            }).start();
            Animated.timing(this.imageWidth, {
                duration: event.duration,
                toValue: LOGO_MIN,
            }).start();
        })
    };

    keyboardWillHide = (event) => {
        // console.log('keyboardWillHide')
        InteractionManager.runAfterInteractions(() => {
            Animated.timing(this.imageHeight, {
                duration: event.duration,
                toValue: LOGO_MAX,
            }).start();
            Animated.timing(this.imageWidth, {
                duration: event.duration,
                toValue: LOGO_MAX,
            }).start();
        })
    };

    keyboardDidShow = (event) => {
        InteractionManager.runAfterInteractions(() => {
            Animated.timing(this.imageHeight, {
                toValue: LOGO_MIN,
            }).start();
            Animated.timing(this.imageWidth, {
                toValue: LOGO_MIN,
            }).start();
        })
        // console.log('keyboardWillShow')
    };

    keyboardDidHide = (event) => {
        InteractionManager.runAfterInteractions(() => {
            Animated.timing(this.imageHeight, {
                toValue: LOGO_MAX,
            }).start();
            Animated.timing(this.imageWidth, {
                toValue: LOGO_MAX,
            }).start();
        })
        // console.log('keyboardWillHide')
    };

    pswBlock = () => {
        this.setState({
            isBlock: !this.state.isBlock
        })
    };

    skipToPlayground = () => {
        Navigation.navigate('Index')
    }

    render() {
        Navigation = this.props.navigation;
        const eyeImg = () => {
            if (!this.state.isBlock) {
                return require('../../images/eye-close2.png')
            } else {
                return require('../../images/eye-open2.png')
            }
        } // change for android
        return (
            <KeyboardAvoidingView style={styles.container} behavior="padding">
                <StatusBar
                    animated={true}
                    hidden={false}
                    translucent={true}
                    barStyle={'light-content'}
                    showHideTransition={'fade'}
                    networkActivityIndicatorVisible={true}
                    backgroundColor = {'#3b5597'}
                />
                <Animated.Image source={_logo} style={[styles.logo,{height:this.imageHeight, width:this.imageWidth}]}/>
                <View style={[styles.inputView,{marginTop: 40}]}>
                    <TextInput
                        placeholder="UserName"
                        autoCapitalize={"none"}
                        autoCorrect={false}
                        style={styles.input}
                    />
                </View>
                <View style={styles.inputView}>
                    <TextInput style={styles.input}
                               placeholder="PassWord"
                               autoCapitalize={'none'}
                               secureTextEntry={this.state.isBlock}
                               autoCorrect={false}
                    />
                    <View style={{height:80, width:80, alignItems:"flex-end", marginRight:0}}>
                        <TouchableWithoutFeedback onPress={this.pswBlock}>
                            <Image style={{margin:10, width:60, height:60}}
                                   source={eyeImg()}
                            />
                        </TouchableWithoutFeedback>
                    </View>
                </View>
                <View style={styles.loginBtnView}>
                    <TouchableWithoutFeedback onPress={this.skipToPlayground}>
                        <View style={styles.loginBtn}>
                            <Text style={{fontSize:28, color:'#3b5597', fontWeight:'bold'}}>{'Login'}</Text>
                        </View>
                    </TouchableWithoutFeedback>
                </View>
            </KeyboardAvoidingView>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        // justifyContent: 'center',
        // alignItems: 'center',
        backgroundColor: '#3b5597'
    },
    header: {
        height: 128,
        marginTop: 0,
        backgroundColor: '#3b5597'
    },
    logo: {
        marginTop: 100,
        marginLeft: 'auto',
        marginRight: 'auto',
    },
    inputView: {
        marginTop:30,
        marginLeft:30,
        marginRight:30,
        height:80,
        borderRadius:4,
        backgroundColor:'#FFFFFF',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    input: {
        fontSize: 30,
        marginLeft: 15,
        width:450
    },
    loginBtnView: {
        height:80,
        margin:30,
        borderRadius:4,
        backgroundColor: '#FFFFFF'
    },
    loginBtn: {
        position:'absolute',
        top:10,
        bottom:10,
        left:10,
        right:10,
        borderColor: '#3b5597',
        backgroundColor:'#FFFFFF',
        borderRadius:4,
        borderWidth:3,
        justifyContent: 'center',
        alignItems: 'center',
    }
});
