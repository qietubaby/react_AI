import * as actionTypes from './actionTypes'
import { hintFinish, finishFirst } from '../../../common/util/Util.js';
export const changeShape = (shape) => (dispatch, getState) => {

 let {
  photos: { curtPhoto: { id: curtPhotoID } },
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
  type: actionTypes.CHANGE_SHAPE,
  shape
 })
}