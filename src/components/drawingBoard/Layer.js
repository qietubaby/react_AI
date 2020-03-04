import React, { Component } from 'react';
import { Layer, Circle, Line } from 'react-konva';
export default class PaintingLayer extends Component {

 render() {
  let {
   points,
   layerID,
   lineColor,
   fixSpotHitIndex,
   lineClosed,
   fill,
   AlterLayerFill,
   AlterLayerSelected,
   AlterLayerHold,
   selectedLayerID,
   overPointIndex
  } = this.props;

  let linePoints = [];

  points.forEach(point => (
   linePoints.push(point.x, point.y)
  ))

  let pointsComp = null;
  pointsComp = points.map((point, i) => {
   return (
    <Circle
     {...{
      key: i,
      x: point.x,
      y: point.y,
      radius: overPointIndex === i ? 8 : 6,
      fill: overPointIndex === 0 && i === 0 && !lineClosed ? null : '#fff',
      stroke: i === 0 ? 'red' : 'black',
      strokeWidth: 3
     }}
     onMouseOver={ev => fixSpotHitIndex(i)}
     onMouseOut={ev => fixSpotHitIndex(null)}
    />
   )
  })
  return (
   <Layer>
    <Line {
     ...{
      points: linePoints,
      stroke: lineColor,
      strokeWidth: 4,
      closed: lineClosed,
      fill: fill || selectedLayerID === layerID ? 'rgba(255,0,0,0.3)' : null
     }}

    />
    {
     lineClosed ? (
      <Line
       {...{
        points: [...linePoints, linePoints[0], linePoints[1]],
        strokeWidth: 14,
        stroke: 'red',
        opacity: 0
       }}

       onMouseOver={ev => {
        AlterLayerFill(layerID, true);
       }}
       onMouseOut={ev => {
        AlterLayerFill(layerID, false);
       }}

       onClick={ev => AlterLayerSelected(layerID)}

       onDblClick={ev => { AlterLayerHold(layerID) }}

      />
     ) : null

    }
    {pointsComp}
   </Layer>
  )
 }


}