import * as actionTypes from './actionTypes'
let initState = {
  imgData: [],
  curtPhoto: {
    id: '',
    src: ''
  }
}
// reducer
export default (state = initState, action) => {
  const { type, imgData, photo } = action
  switch (type) {
    case actionTypes.LOAD_IMAGE:
      return { ...state, imgData }
    case actionTypes.SWITCH_PHOTO:
      return {
        ...state, curtPhoto: photo
      }
    default:
      return state;
  }

}

