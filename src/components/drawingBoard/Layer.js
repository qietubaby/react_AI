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
   curtLayerID,
   shape
  } = this.props;


  // linePoints会随着图形的位置而改变
  let linePoints = [];
  points.forEach(point => (
   linePoints.push(point.x, point.y)
  ))



  // oriLinePoints始终不会变，一直都是初始的位置，除非图形移动
  let oriLinePoints = null;
  if (oriPoints) {
   oriLinePoints = []
   oriPoints.forEach(point => (
    oriLinePoints.push(point.x, point.y)  // oriPoints一旦改动，oriLinePoints就会跟着变动，线条也会跟着改变
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

       // 下面这句话是修复图形移动后，再次拖动点图形不跟着改变的bug
       // 如果 oriPoints 有值，代表图形已经发生了移动，就要去重置 oriPoints的值
       if (oriPoints) {
        oriPoints[i].x = x - this.newOriPoints[i].x + oriPoints[i].x
        oriPoints[i].y = y - this.newOriPoints[i].y + oriPoints[i].y
       }
       MovePoint(layerID, i, x, y)




       // 矩形图形  移动点时，其他点的活动状态
       if (shape === 1) {
        switch (i) {
         case 0:
          MovePoint(layerID, 1, null, y);
          MovePoint(layerID, 3, x, null);
          if (oriPoints) {
           oriPoints[1].y = y - this.newOriPoints[1].y + oriPoints[1].y;
           oriPoints[3].x = x - this.newOriPoints[3].x + oriPoints[3].x;
          }
          break;
         case 1:
          MovePoint(layerID, 0, null, y);
          MovePoint(layerID, 2, x, null);
          if (oriPoints) {
           oriPoints[0].y = y - this.newOriPoints[0].y + oriPoints[0].y;
           oriPoints[2].x = x - this.newOriPoints[2].x + oriPoints[2].x;
          }
          break;
         case 2:
          MovePoint(layerID, 1, x, null);
          MovePoint(layerID, 3, null, y);
          if (oriPoints) {
           oriPoints[1].x = x - this.newOriPoints[1].x + oriPoints[1].x;
           oriPoints[3].y = y - this.newOriPoints[3].y + oriPoints[3].y;
          }
          break;
         case 3:
          MovePoint(layerID, 0, x, null);
          MovePoint(layerID, 2, null, y);
          if (oriPoints) {
           oriPoints[0].x = x - this.newOriPoints[0].x + oriPoints[0].x;
           oriPoints[2].y = y - this.newOriPoints[2].y + oriPoints[2].y;
          }
          break;
         default:

        }
       }

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
       this.oriPoints = points.slice(); //把图形的初始位置存起来 
      }
     }}

     // 重点是要存着第一次图形所在的位置，在这个基础位置上加上移动的距离，而不是直接使用points加上移动的距离。
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