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
import MovieService from '../../services/movieService'
import Loading from '../../common/loading'
const movieService = new MovieService()
export default class Movie extends Component {
    constructor(props){
        super(props);
        this.state = {
            visible: false
        }
    }

    static navigationOptions = ({navigation}) => {
        return ({
            title:'电影院线',
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
        this.getMovieListData()
    }

    componentWillUnmount() {
        this._isMounted = false
    }

    getMovieListData = () => {
        this.setState({
            visible: true
        })
        let params = {}
        params.type = 'hot'
        params.offset = 0
        params.limit = 20
        movieService.GetMovieList(params).then(
            (res) => {
                console.log(res.data.movies)
                this.setState({
                    visible: false
                })
            }
        ).catch((error) => {
            console.log(error)
        }).done()
    }

    render() {
        // Navigation = this.props.navigation;

        return (
            <View style={styles.container}>
                <Loading visible={this.state.visible}/>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#efefef'
    }
});



