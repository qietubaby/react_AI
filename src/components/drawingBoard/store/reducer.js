import * as actionTypes from './actionTypes'
import Konva from 'konva'
let initState = {
  drewImage: null,
  layersData: {

  }
}
// reducer
export default (state = initState, action) => {
  const { type, imgObj, curtPhotoID } = action
  let { layersData } = state;
  let { layers } = layersData;
  if (!layers) layers = [];

  switch (type) {
    case actionTypes.DREW_IMAGE:

      return { ...state, drewImage: imgObj }
    case actionTypes.ADD_TEMP_LAYER:

      let tempLayerID = Math.random()

      return {
        ...state, layersData: {
          ...layersData,
          [curtPhotoID]: {
            layers: [...layers, {
              id: tempLayerID,
              points: [],
              lineColor: Konva.Util.getRandomColor()
            }]
          }
        }
      }
    default:
      return state;
  }

}


