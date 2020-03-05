import React, { Component } from 'react';
import { Layer, Circle, Line } from 'react-konva';
export default class PaintingLayer extends Component {
 constructor(props) {
  super(props);
  this.dragLimitControl = 8;
  this.oriPoints = null;
  this.newOriPoints = null;
 }

 render() {
  let { dragLimitControl, oriPoints } = this;
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
   MoveLayer,
   stageWidth,
   stageHeight,
   curtLayerID
  } = this.props;

  let linePoints = [];

  points.forEach(point => (
   linePoints.push(point.x, point.y)
  ))

  let oriLinePoints = null;
  if (oriPoints) {
   oriLinePoints = []
   oriPoints.forEach(point => (
    oriLinePoints.push(point.x, point.y)
   ))
  }


  let pointsComp = null;

  if (selectedLayerID === layerID || curtLayerID === layerID) {
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

      onDragStart={ev => {
       if (this.oriPoints) {
        this.newOriPoints = points.slice()
       }
      }}

      onDragMove={ev => {
       let { x, y } = ev.target.attrs;

       if (x < dragLimitControl || y < dragLimitControl || x > stageWidth || y > stageHeight) return;

       if (oriPoints) {
        oriPoints[i].x = x - this.newOriPoints[i].x + oriPoints[i].x
        oriPoints[i].y = y - this.newOriPoints[i].y + oriPoints[i].y
       }

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
  }

  return (
   <Layer>
    <Line {
     ...{
      points: oriLinePoints || linePoints,
      stroke: lineColor,
      strokeWidth: 4,
      closed: lineClosed,
      fill: fill || selectedLayerID === layerID ? 'rgba(255,0,0,0.3)' : null,
      listening: selectedLayerID === layerID ? true : false,
      lineJoin: 'round',
      draggable: true
     }}
     onDblClick={ev => { AlterLayerHold(layerID) }}

     onDragStart={ev => {
      if (!this.oriPoints) {
       this.oriPoints = points.slice(); // 记录初始的点的位置 
      }
     }}

     // 重点是记录第一次图形的位置，在这个基础位置上加上移动的距离，而不是直接使用points加上移动的距离。

     onDragMove={ev => {

      let { x, y, points } = ev.target.attrs; // x y 总是记录离元素最初的位置的距离

      let newPointsArr = this.oriPoints.map((point, i) => {

       return {
        x: point.x + x,
        y: point.y + y
       }

      });

      MoveLayer(newPointsArr, layerID);

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