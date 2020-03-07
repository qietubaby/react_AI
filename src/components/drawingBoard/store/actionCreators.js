import * as actionTypes from './actionTypes'


import { hintFinish, finishFirst } from '../../../common/util/Util.js';

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

// 画矩形
export const genRect = (x, y) => (dispatch, getState) => {

 dispatch(addSpot(x, y));
 dispatch(addSpot(x, y));
 dispatch(addSpot(x, y));
 dispatch(addSpot(x, y));
 dispatch(closeLine(true));


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

// 写入标注name和attr完成标注
export const editLayerDone = (editLayerID, layerName, attr) => (dispatch, getState) => {
 let curtPhotoID = getState().photos.curtPhoto.id;
 dispatch({
  type: actionTypes.EDIT_LAYER_DONE,
  editLayerID,
  curtPhotoID,
  layerName,
  attr
 })
 dispatch(addTempLayer(curtPhotoID));
}

export const alterLayerFill = (fillLayerID, isFill) => (dispatch, getState) => {
 let curtPhotoID = getState().photos.curtPhoto.id;
 dispatch({
  type: actionTypes.ALTER_LAYER_FILL,
  curtPhotoID,
  fillLayerID,
  isFill
 });

}

export const alterLayerSelected = (selectedLayerID) => (dispatch, getState) => {
 let curtPhotoID = getState().photos.curtPhoto.id;



 let {
  board: { layersData }
 } = getState()
 let layerGroup = layersData[curtPhotoID]

 if (layerGroup) {

  let { holdingLayerID, layers, curtLayerID } = layerGroup;
  if (holdingLayerID || finishFirst(layers, curtLayerID)) {
   hintFinish()
   return;
  }
 }


 dispatch({
  type: actionTypes.ALTER_LAYER_SELECTED,
  selectedLayerID,
  curtPhotoID
 });
}

export const undo = (undoLayerID) => (dispatch, getState) => {
 let curtPhotoID = getState().photos.curtPhoto.id;
 dispatch({
  type: actionTypes.UNDO,
  undoLayerID,
  curtPhotoID
 });
}

export const deleteLayer = (deleteLayerID) => (dispatch, getState) => {
 let curtPhotoID = getState().photos.curtPhoto.id;

 dispatch({
  type: actionTypes.DELETE_LAYER,
  deleteLayerID,
  curtPhotoID
 });
}

export const movePoint = (pointMoveLayerID, pointIndx, pointX, pointY) => (dispatch, getState) => {
 let curtPhotoID = getState().photos.curtPhoto.id;
 dispatch({
  type: actionTypes.MOVE_POINT,
  pointMoveLayerID,
  curtPhotoID,
  pointIndx,
  pointX,
  pointY
 })

}

export const moveLayer = (points, moveLayerID) => (dispatch, getState) => {
 let curtPhotoID = getState().photos.curtPhoto.id;
 dispatch({
  type: actionTypes.MOVE_LAYER,
  moveLayerID,
  points,
  curtPhotoID
 })
}





