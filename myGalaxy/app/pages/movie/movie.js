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
    Dimensions,
    TouchableWithoutFeedback,
    FlatList
} from 'react-native';
import MovieService from '../../services/movieService'
import Loading from '../../common/loading'
import Swiper from 'react-native-swiper'
import SliderItem from './sliderItem'
import FlatListItem from './flatListItem'
const movieService = new MovieService()
var {height, width} = Dimensions.get('window')
var itemHeight = 320
import StarRating from 'react-native-star-rating'
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
                    <SliderItem key={'item-'+i} item={item}/>
                )
                modelMap.push(map)
            })
            return modelMap
        }
    }

    renderItemView = (item) => {
        return (
            <FlatListItem item={item} itemHeight={itemHeight}/>
        )
    }

    renderItemLayout = (data, index) => {
        return {length: itemHeight,offset: itemHeight*index,index}
    }

    render() {
        // Navigation = this.props.navigation;
        // console.log(this.state.bannerArray)
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
                        this.state.bannerArray.length > 0 ?
                            <View>
                                <Swiper
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
                                </Swiper>
                            </View>
                         : null
                    }
                    <View>
                        <FlatList
                            style={{margin: 20}}
                            data = {this.state.listArray}
                            keyExtractor={(item, index) => index}
                            renderItem={
                                ({item}) => this.renderItemView(item)
                            }
                            getItemLayout={(data, index) => this.renderItemLayout(data, index)}
                            showsVerticalScrollIndicator={false}
                            numColumns={3}
                        />
                    </View>
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
        marginBottom: 10
    }
});



