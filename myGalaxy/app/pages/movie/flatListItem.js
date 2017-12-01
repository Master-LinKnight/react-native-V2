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
export default class FlatListItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    render() {
        var { item,itemHeight } = this.props;
        return(
            <View style={[styles.itemContainer, {height: itemHeight}]}>
                <View style={styles.itemImgView}>
                    <Image style={styles.itemImg} source={{uri:item.img}}/>
                </View>
                <View style={styles.itemView}>
                    <Text style={styles.filmTitle} numberOfLines={1}>{item.nm}</Text>
                    <View style={styles.ratingView}>
                        <StarRating
                            disabled={false}
                            rating={item.sc / 2}
                            maxStars={5}
                            halfStarEnabled={true}
                            emptyStar={require('../../images/star-none.png')}
                            halfStar={require('../../images/star-half.png')}
                            fullStar={require('../../images/star-full.png')}
                            starStyle={{width: 20, height: 20, marginTop: 2}}
                            selectedStar={(rating)=>{}}/>
                        <Text style={styles.ratingTxt}>{item.sc}</Text>
                    </View>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    itemContainer: {
        width: 180,
        justifyContent: 'center',
        alignItems: 'center',
        margin: 10,
        borderRadius: 8,
        shadowOffset: {width: 5, height: 5},
        shadowColor: 'black',
        shadowOpacity: 0.4,
        shadowRadius: 5,
        elevation: 4
    },
    itemView: {
        height: 70,
        width: 180,
        backgroundColor: '#3b5597',
        justifyContent: 'center',
        alignItems: 'center',
        borderBottomLeftRadius: 8,
        borderBottomRightRadius: 8
    },
    itemImgView: {
        borderTopLeftRadius: 8,
        borderTopRightRadius: 8,
        overflow: 'hidden',
        height: 250,
        width: 180
    },
    itemImg: {
        borderTopLeftRadius: 8,
        borderTopRightRadius: 8,
        height: 250,
        width: 180
    },
    filmTitle: {
        fontSize: 24,
        color: '#ffffff'
    },
    ratingView: {
        flexDirection: 'row',
        marginTop: 5
    },
    ratingTxt: {
        fontSize: 20,
        color: '#ffcc33',
        fontWeight: '500',
        marginLeft: 16
    }
});