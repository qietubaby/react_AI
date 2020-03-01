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



