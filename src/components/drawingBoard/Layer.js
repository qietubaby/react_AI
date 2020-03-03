import React, { Component } from 'react';
import { Layer, Circle, Line } from 'react-konva';
export default class PaintingLayer extends Component {

 render() {
  let {
   points,
   layerID,
   lineColor,
   fixFirstSpotHit,
   lineClosed,
   fill,
   AlterLayerFill,
   AlterLayerSelected,
   AlterLayerHold,
   selectedLayerID,
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
      radius: 6,
      fill: '#fff',
      stroke: 'black',
      strokeWidth: 3
     }}
     onMouseOver={ev => fixFirstSpotHit(true)}
     onMouseOut={ev => fixFirstSpotHit(false)}
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