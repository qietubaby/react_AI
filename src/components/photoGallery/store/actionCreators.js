import * as actionTypes from './actionTypes'
import { drewImage, addTempLayer } from '../../drawingBoard/store/actionCreators';
import { hintFinish, finishFirst } from '../../../common/util/Util.js';

export const loadImage = (imgData) => ({
 type: actionTypes.LOAD_IMAGE,
 imgData
})


// export const switchPhoto = (photo) => ({
//  type: actionTypes.SWITCH_PHOTO,
//  photo
// })

export const switchPhoto = (photo) => (dispatch, getState) => {


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


 // 切换图片
 dispatch({
  type: actionTypes.SWITCH_PHOTO,
  photo
 })

 // 绘制大图片
 dispatch(drewImage(photo.src))

 //更换图片添加一个临时图层
 if (!getState().board.layersData[photo.id]) {
  dispatch(addTempLayer(photo.id))
 }




}