import * as actionTypes from './actionTypes'

export default function shape(state = 1, action) {
  let { type, shape } = action;
  switch (type) {
    case actionTypes.CHANGE_SHAPE:
      return shape;
    default:
      return state;
  }
}