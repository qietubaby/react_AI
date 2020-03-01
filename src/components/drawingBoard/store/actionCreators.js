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