import * as actionTypes from './actionTypes'
import { drewImage } from '../../drawingBoard/store/actionCreators';
export const loadImage = (imgData) => ({
 type: actionTypes.LOAD_IMAGE,
 imgData
})


// export const switchPhoto = (photo) => ({
//  type: actionTypes.SWITCH_PHOTO,
//  photo
// })

export const switchPhoto = (photo) => {
 return (dispatch) => {
  dispatch({
   type: actionTypes.SWITCH_PHOTO,
   photo
  })
  dispatch(drewImage(photo.src))
 }


}