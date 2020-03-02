import * as actionTypes from './actionTypes'
export const drewImage = (url) => {
 return (dispatch) => {
  let imgObj = new window.Image();
  imgObj.onload = () => {
   dispatch({
    type: actionTypes.DREW_IMAGE,
    imgObj
   })
  }
  imgObj.src = url;
 }
}

export const addTempLayer = (curtPhotoID) => ({
 type: actionTypes.ADD_TEMP_LAYER,
 curtPhotoID
})

export const addSpot = (x, y) => (dispatch, getState) => {
 let curtPhotoID = getState().photos.curtPhoto.id
 let { curtLayerID } = getState().board.layersData[curtPhotoID]
 dispatch({
  type: actionTypes.ADD_SPOT,
  curtPhotoID,
  pointX: x,
  pointY: y,
  curtLayerID
 })
}

// 闭合线条
export const closeLine = (closed) => (dispatch, getState) => {

 let curtPhotoID = getState().photos.curtPhoto.id
 let { curtLayerID } = getState().board.layersData[curtPhotoID]

 dispatch({
  type: actionTypes.ALTER_CLOSE_LINE,
  curtPhotoID,
  curtLayerID,
  closed
 })
}

// 添加图层标注
export const alterLayerHold = (holdingLayerID) => (dispatch, getState) => {
 let curtPhotoID = getState().photos.curtPhoto.id;

 dispatch({
  type: actionTypes.ALTER_LAYER_HOLD,
  holdingLayerID,
  curtPhotoID
 })
}





