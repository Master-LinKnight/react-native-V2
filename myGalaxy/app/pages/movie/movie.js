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
    RefreshControl,
    Text,
    TouchableWithoutFeedback,
} from 'react-native';
import MovieService from '../../services/movieService'
import Loading from '../../common/loading'
import Swiper from 'react-native-swiper'
const movieService = new MovieService()
export default class Movie extends Component {
    constructor(props){
        super(props);
        this.state = {
            refresh: false,
            isFreshed: false,
            bannerArray: [],
            listArray: []
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
            refresh: true,
        })
        let params = {}
        params.type = 'hot'
        params.offset = 0
        params.limit = 20
        movieService.GetMovieList(params).then(
            (res) => {
                // console.log(res.data.movies)
                // console.log('-----0-5',res.data.movies.slice(0,5))
                // console.log('-----5-20',res.data.movies.slice(5,20))
                this.setState({
                    refresh: false,
                    isFreshed: true,
                    bannerArray: res.data.movies.slice(0, 5),
                    listArray: res.data.movies.slice(5, 20)
                })
            }
        ).catch((error) => {
            console.log(error)
        }).done()
    }

    swiperItem = () => {
        const model = this.state.bannerArray
        // console.log(model)
        if (model != null && model.length > 0)
        {
            let modelMap = []
            model.map((item, i) => {
                const map = (
                    <View key={'item-'+i} style={styles.itemContainer}>
                        <View style={styles.itemView}>
                            <View style={{width: 260, height: 360, alignSelf: 'flex-end'}}>
                                <Text style={{ fontSize: 36, marginTop: 50, color: '#666666'}}
                                      numberOfLines={1}>
                                    {item.nm}
                                </Text>
                                <Text style={{fontSize: 24, marginTop: 20, color: '#999999'}}
                                      numberOfLines={1}>
                                    {'导演：' + item.dir}
                                </Text>
                                <Text style={{fontSize: 24, marginTop: 10, color: '#999999'}}
                                      numberOfLines={2}>
                                    {'主演：' + item.star}
                                </Text>
                            </View>
                        </View>
                        <View style={styles.bannerView}>
                            <Image source={{uri:item.img}} style={styles.bannerImg}/>
                        </View>
                    </View>
                )
                modelMap.push(map)
            })
            return modelMap
        }
    }

    render() {
        // Navigation = this.props.navigation;
        console.log(this.state.bannerArray)
        return (
            <View style={styles.container}>
                <Loading visible={(this.state.refresh && !this.state.isFreshed)}/>
                <ScrollView
                    style={styles.container}
                    refreshControl={
                        <RefreshControl
                            refreshing={this.state.refresh}
                            onRefresh={() => this.getMovieListData()}
                        />
                    }
                >
                    {
                        this.state.bannerArray.length > 0 ? <Swiper
                            height={440}
                            autoplay={true}
                            loop={true}
                            horizontal={true}
                            autoplayTimeout={4}
                            dot={<View style={styles.dot} />}
                            activeDot={<View style={styles.activeDot} />}
                            paginationStyle={styles.pagination}
                        >
                            {this.swiperItem()}
                        </Swiper> : null
                    }

                </ScrollView>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#efefef'
    },
    swiper: {
        height: 220
    },
    dot: {
        backgroundColor:'rgba(0,0,0,.2)',
        width: 8,
        height: 8,
        borderRadius: 4,
        marginLeft: 3,
        marginRight: 3,
        marginTop: 3,
        marginBottom: 40
    },
    activeDot: {
        backgroundColor: '#3b5597',
        width: 16,
        height: 16,
        borderRadius: 8,
        marginLeft: 3,
        marginRight: 3,
        marginTop: 3,
        marginBottom: 40
    },
    pagination: {
        justifyContent: 'flex-end',
        marginRight: 60,
    },
    itemContainer: {
        height: 440,
        backgroundColor: '#efefef'
    },
    itemView: {
        height: 360,
        flexDirection: 'row-reverse',
        alignItems: 'center',
        margin: 40,
        marginLeft: 20,
        marginRight: 20,
        paddingLeft:20,
        paddingRight: 20,
        borderRadius: 10,
        backgroundColor: '#ffffff',
        shadowOffset: {width: 5, height: 5},
        shadowColor: 'black',
        shadowOpacity: 0.4,
        shadowRadius: 5,
        elevation: 8
    },
    bannerView: {
        width: 250,
        height: 400,
        borderRadius: 8,
        shadowOffset: {width: 4, height: 4},
        shadowColor: 'black',
        shadowOpacity: 0.4,
        shadowRadius: 4,
        elevation: 8,
        position: 'absolute',
        top: 20,
        left: 60
    },
    bannerImg: {
        width: 250,
        height: 400,
        borderRadius: 8,
    }
});



