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

export default class TopicItem extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }

    onTextLayout(event){
        let descHeight = event.nativeEvent.layout.height;
        let totalHeight = descHeight + 85 > 110 ? descHeight + 90 : 110

        this.refs.item.setNativeProps({
            style:{
                height:totalHeight,
                backgroundColor: 'white',
                margin:20,
                marginBottom: 0,
                shadowOffset: {width: 5, height: 5},
                shadowColor: 'black',
                shadowOpacity: 0.4,
                shadowRadius: 5
            }
        });
    }

    formatDate = (strTime) => {
        var date = new Date(strTime);
        return date.getFullYear()+"-"+(date.getMonth()+1)+"-"+date.getDate();
    }

    onItemClick = (rowData) => {
        // const {dispatch} = this.props
        // console.log(dispatch(routerPage('Detail',rowData,false)))
        const {navigation} = this.props
        navigation.navigate('Detail', {data: rowData})
    }

    render() {
        const {rowData} = this.props;
        return(
            <TouchableWithoutFeedback onPress={this.onItemClick.bind(this, rowData)}>
                <View ref="item" style={styles.listItem}>
                    <Text style={styles.listItemTitle} onLayout={this.onTextLayout.bind(this)}>{rowData.desc}</Text>
                    <View style={styles.listItemBox}>
                        <Text style={styles.listItemBoxText}>{'作者：' + rowData.who}</Text>
                        <Text style={styles.listItemBoxText}>{this.formatDate(rowData.publishedAt)}</Text>
                    </View>
                </View>
            </TouchableWithoutFeedback>
        );
    }
}

const styles = StyleSheet.create({
    listItem: {
        height: 110,
        backgroundColor: 'white',
        margin:20,
        marginBottom: 0,
        shadowOffset: {width: 5, height: 5},
        shadowColor: 'black',
        shadowOpacity: 0.4,
        shadowRadius: 5,
        elevation: 4
    },
    listItemTitle: {
        fontSize: 24,
        marginTop: 24,
        marginLeft: 24,
        marginRight: 24,
        color: '#333333'
    },
    listItemBox: {
        margin: 24,
        marginTop: 12,
        justifyContent: 'space-between',
        flexDirection: 'row'
    },
    listItemBoxText: {
        fontSize: 20,
        color: "#999999"
    }
});