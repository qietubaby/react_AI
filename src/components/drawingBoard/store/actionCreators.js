import * as actionTypes from './actionTypes'


import { hintFinish, finishFirst } from '../../../common/util/Util.js'

let oriStageWidth = 760;
let oriStageHeight = 500;

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



 let {
  board: { layersData }
 } = getState()
 let layerGroup = layersData[curtPhotoID]

 if (layerGroup) {

  let { holdingLayerID } = layerGroup;
  if (holdingLayerID) {
   hintFinish()
   return;
  }
 }



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
 let curtPhotoID = getState().photos.curtPhoto.id
 let {
  board: { layersData }
 } = getState()
 let layerGroup = layersData[curtPhotoID]

 if (layerGroup) {

  let { holdingLayerID } = layerGroup;
  if (holdingLayerID) {
   hintFinish()
   return;
  }
 }

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
 let { shape } = getState()
 dispatch({
  type: actionTypes.EDIT_LAYER_DONE,
  editLayerID,
  curtPhotoID,
  layerName,
  attr,
  shapeType: shape
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

export const adaptStage = () => (dispatch, getState) => {
 let { stageWidth } = getState().board.stage;
 let curtPhotoID = getState().photos.curtPhoto.id;
 let evoScale = oriStageWidth / stageWidth;
 dispatch({
  type: actionTypes.ALTER_STAGE,
  stageWidth: oriStageWidth,
  stageHeight: oriStageHeight,
  evoScale,
  curtPhotoID
 });
}


export const incrementStage = () => (dispatch, getState) => {

 let { stageWidth, stageHeight } = getState().board.stage;

 let curtPhotoID = getState().photos.curtPhoto.id;

 let preWidth = stageWidth;

 stageWidth *= 1.2;
 stageHeight *= 1.2;

 if (stageWidth > 2760 || stageHeight > 1500) return;


 let evoScale = stageWidth / preWidth;

 dispatch({
  type: actionTypes.ALTER_STAGE,
  stageWidth,
  stageHeight,
  evoScale,
  curtPhotoID
 });

}

export const decrementStage = () => (dispatch, getState) => {
 let { stageWidth, stageHeight } = getState().board.stage;

 let curtPhotoID = getState().photos.curtPhoto.id;

 let preWidth = stageWidth;

 stageWidth /= 1.2;
 stageHeight /= 1.2;

 if (stageWidth < 760 || stageHeight < 500) {
  stageWidth = oriStageWidth;
  stageHeight = oriStageHeight;
 }

 let evoScale = stageWidth / preWidth;
 dispatch({
  type: actionTypes.ALTER_STAGE,
  stageWidth,
  stageHeight,
  evoScale,
  curtPhotoID
 });

}





