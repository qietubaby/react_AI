import React, { Component } from 'react';
import { Layer, Circle, Line } from 'react-konva';
export default class PaintingLayer extends Component {
 // constructor(props) {
 //  super(props);

 // }
 render() {
  let { points, layerID, lineColor } = this.props;

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
    />
   )
  })
  return (
   <Layer>
    <Line {
     ...{
      points: linePoints,
      stroke: lineColor,
      strokeWidth: 4
     }
    } />
    {pointsComp}
   </Layer>
  )
 }


}