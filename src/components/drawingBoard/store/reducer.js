import * as actionTypes from './actionTypes'
import Konva from 'konva'
let initState = {
  drewImage: null,
  layersData: {

  }
}
// reducer
export default (state = initState, action) => {
  const {
    type,
    imgObj,
    curtPhotoID,
    curtLayerID,
    pointX,
    pointY,
    closed,
    holdingLayerID,
    editLayerID,
    layerName,
    attr,
    fillLayerID,
    isFill,
    selectedLayerID,
    undoLayerID,
    deleteLayerID

  } = action
  let { layersData } = state;
  let layerGroup = {}
  if (curtPhotoID !== undefined) {
    layerGroup = layersData[curtPhotoID]
  }

  let layers = []



  if (layerGroup && layerGroup.layers) {
    layers = layerGroup.layers;
  }


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
              lineColor: Konva.Util.getRandomColor(),
              lineClosed: false,

              //用来判断标注有没有完成
              everDone: false
            }],
            //当前图层的id
            curtLayerID: tempLayerID,
            holdingLayerID: null,
            selectedLayerID: null
          }
        }
      }
    case actionTypes.ADD_SPOT:
      layers = layers.map(layer => {
        if (layer.id === curtLayerID) {
          layer.points = [...layer.points, { x: pointX, y: pointY }]
        }
        return layer
      })

      return {
        ...state, layersData: {
          ...layersData,
          [curtPhotoID]: { ...layerGroup }
        }
      }


    case actionTypes.ALTER_CLOSE_LINE:

      layers = layers.map(layer => {
        if (layer.id === curtLayerID) {
          layer.lineClosed = closed
        }
        return layer
      })

      return {
        ...state, layersData: {
          ...layersData,
          [curtPhotoID]: { ...layerGroup }
        }
      }


    case actionTypes.ALTER_LAYER_HOLD:

      return {
        ...state, layersData: {
          ...layersData,
          [curtPhotoID]: { ...layerGroup, holdingLayerID }
        }
      }

    case actionTypes.EDIT_LAYER_DONE:
      layers = layers.map(layer => {
        if (layer.id === editLayerID) {
          layer.layerName = layerName;
          layer.attr = attr
          layer.everDone = true;
        }
        return layer;
      });
      return {
        ...state, layersData: {
          ...layersData,
          [curtPhotoID]: { ...layerGroup, layers, holdingLayerID: null }
        }
      }
    case actionTypes.ALTER_LAYER_FILL:
      layers = layers.map(layer => {
        if (layer.id === fillLayerID) {
          layer.fill = isFill
        }
        return layer
      })
      return {
        ...state, layersData: {
          ...layersData,
          [curtPhotoID]: { ...layerGroup, layers }
        }
      }
    case actionTypes.ALTER_LAYER_SELECTED:
      return {
        ...state, layersData: {
          ...layersData,
          [curtPhotoID]: { ...layerGroup, selectedLayerID }
        }
      }
    case actionTypes.UNDO:
      layers = layers.map(layer => {
        if (layer.id === undoLayerID) {
          if (layer.lineClosed) {
            layer.lineClosed = false
          } else {
            layer.points.pop()
          }
        }
        return layer
      })
      return {
        ...state, layersData: {
          ...layersData,
          [curtPhotoID]: { ...layerGroup, layers, holdingLayerID: null }
        }
      }
    case actionTypes.DELETE_LAYER:
      let shouldDeleteIndex = null;
      layers = layers.map((layer, i) => {

        if (layer.id === deleteLayerID) {
          if (layer.everDone) {
            shouldDeleteIndex = i
          } else {
            layer.lineClosed = false;
            layer.points = []
          }
        }

        return layer
      })
      if (shouldDeleteIndex !== null) {
        layers.splice(shouldDeleteIndex, 1)
      }
      return {
        ...state, layersData: {
          ...layersData,
          [curtPhotoID]: { ...layerGroup, layers, holdingLayerID: null, selectedLayerID: null }
        }

      }


    default:
      return state;
  }

}


