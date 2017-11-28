/**
 *
 * Copyright 2016-present reading
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 */
import React, { Component } from 'react';
import {
    StyleSheet,
    Dimensions,
    View,
    Text,
    Modal,
    ActivityIndicator,
    Easing,
    LayoutAnimation,
    Animated,
    TouchableWithoutFeedback,
    Image
} from 'react-native';
import {ctrlImage} from '../actions/image'

export default class LookingImage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            width: 0,
            height: 0
        };
    }

    clickToCloseModal = () => {
        const {dispatch, image} = this.props

        if (image.visible == true)
        {
            dispatch(ctrlImage(false, ''))
        }
    }

    onRequestClose = () => {

    }

    render() {
        const {image} = this.props
        let w = 0
        let h = 0
        const self = this

        if (image.imageUrl && image.imageUrl != '')
        {
            Image.getSize(image.imageUrl,(width,height) => {
                if (width > Dimensions.get('window').width)
                {
                    height = Dimensions.get('window').width / width * height
                    width = Dimensions.get('window').width
                }
                self.setState(
                    {
                        width: width,
                        height: height
                    }
                )
            })
        }

        return(
            <Modal transparent visible={image.visible} onRequestClose={this.onRequestClose}>
                <TouchableWithoutFeedback onPress={this.clickToCloseModal}>
                    <View style={styles.container}>
                        <Image style={{height:this.state.height, width:this.state.width, borderRadius: 10}} source={{uri:image.imageUrl}}/>
                        {/*<Animated.Image style = {{height:h, width:w}} source = {{uri:image.src}} />*/}
                    </View>
                </TouchableWithoutFeedback>
            </Modal>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.4)',
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        alignItems: 'center',
        justifyContent: 'center'
    }
});