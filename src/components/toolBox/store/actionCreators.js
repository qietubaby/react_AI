import * as actionTypes from './actionTypes'

export const changeShape = (shape) => (dispatch, getState) => {
 dispatch({
  type: actionTypes.CHANGE_SHAPE,
  shape
 })
}