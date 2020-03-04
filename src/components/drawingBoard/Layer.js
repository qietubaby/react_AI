import React, { Component } from 'react';
import { Layer, Circle, Line } from 'react-konva';
export default class PaintingLayer extends Component {
 constructor(props) {
  super(props);
  this.dragLimitControl = 8
 }

 render() {
  let { dragLimitControl } = this;
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
   overPointIndex,
   MovePoint,
   stageWidth,
   stageHeight
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
      strokeWidth: 3,
      draggable: true
     }}
     onMouseOver={ev => fixSpotHitIndex(i)}
     onMouseOut={ev => fixSpotHitIndex(null)}
     onDragMove={ev => {
      let { x, y } = ev.target.attrs;

      if (x < dragLimitControl || y < dragLimitControl || x > stageWidth || y > stageHeight) return;
      MovePoint(layerID, i, x, y)
     }}
     dragBoundFunc={
      ({ x, y }) => {

       if (x > stageWidth - dragLimitControl) {
        x = stageWidth - dragLimitControl;
       }

       if (x < dragLimitControl) {
        x = dragLimitControl;
       }
       if (y > stageHeight - dragLimitControl) {
        y = stageHeight - dragLimitControl;
       }

       if (y < dragLimitControl) {
        y = dragLimitControl;
       }

       return { x, y }
      }
     }
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
      fill: fill || selectedLayerID === layerID ? 'rgba(255,0,0,0.3)' : null,

      lineJone: 'round'
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