import * as types from './types'

export function ctrlImage(visible, imageUrl) {
    return dispatch => {
        if (visible)
        {
            dispatch(openPicture(imageUrl))
        }
        else
        {
            dispatch(closePicture())
        }
    }
}

function openPicture(imageUrl) {
    return {
        type: types.OPEN_TO_LOOK_PICTURE,
        imageUrl: imageUrl,
        visible: true
    }
}

function closePicture() {
    return {
        type: types.CLOSE_TO_LOOK_PICTURE,
        imageUrl: '',
        visible: false
    }
}