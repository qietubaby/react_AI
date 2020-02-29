import * as actionTypes from './actionTypes'
export const loadImage = (imgData) => ({
 type: actionTypes.LOAD_IMAGE,
 imgData
})
export const switchPhoto = (photo) => ({
 type: actionTypes.SWITCH_PHOTO,
 photo
})