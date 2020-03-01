import * as actionTypes from './actionTypes'
let initState = {
  drewImage: null
}
// reducer
export default (state = initState, action) => {
  const { type, imgObj } = action

  switch (type) {
    case actionTypes.DREW_IMAGE:

      return { ...state, drewImage: imgObj }
    default:
      return state;
  }

}


