import React, { Component } from 'react';
import {
    Platform,
    Image,
    StyleSheet,
    ScrollView,
    View,
    Text,
    TouchableWithoutFeedback,
    ListView,
    RefreshControl
} from 'react-native';
import StarRating from 'react-native-star-rating'
export default class SliderItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        const { item } = this.props;
        return(
            <View style={styles.itemContainer}>
                <View style={styles.itemView}>
                    <View style={styles.itemInfo}>
                        <Text style={styles.filmTitle}
                              numberOfLines={1}>
                            {item.nm}
                        </Text>
                        <Text style={styles.filmTxt}
                              numberOfLines={1}>
                            {'导演：' + item.dir}
                        </Text>
                        <Text style={[styles.filmTxt, {marginTop: 10}]}
                              numberOfLines={2}>
                            {'主演：' + item.star}
                        </Text>
                        <Text style={styles.filmTxt}
                              numberOfLines={2}>
                            {item.snum + '看过'}
                        </Text>
                        <View style={styles.ratingView}>
                            <StarRating
                                disabled={false}
                                rating={item.sc / 2}
                                maxStars={5}
                                halfStarEnabled={true}
                                emptyStar={require('../../images/star-none.png')}
                                halfStar={require('../../images/star-half.png')}
                                fullStar={require('../../images/star-full.png')}
                                starStyle={{width: 35, height: 35}}
                                selectedStar={(rating)=>{}}/>
                            <Text style={styles.ratingTxt}>{item.sc}</Text>
                        </View>
                    </View>
                </View>
                <View style={styles.bannerView}>
                    <Image source={{uri:item.img}} style={styles.bannerImg}/>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
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
    },
    itemInfo: {
        width: 260,
        height: 360,
        alignSelf: 'flex-end'
    },
    filmTitle: {
        fontSize: 36,
        marginTop: 50,
        color: '#666666'
    },
    filmTxt: {
        fontSize: 24,
        marginTop: 20,
        color: '#999999'
    },
    ratingView: {
        flexDirection: 'row',
        marginTop: 10
    },
    ratingTxt: {
        fontSize: 30,
        color: '#ffcc33',
        fontWeight: '500',
        marginLeft: 16,
    }
});