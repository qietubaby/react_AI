import React, { Component } from 'react';
import { Layer, Circle, Line } from 'react-konva';
export default class PaintingLayer extends Component {
 // constructor(props) {
 //  super(props);

 // }
 render() {
  let { points, lineColor, fixFirstSpotHit, lineClosed } = this.props;

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
      fill: lineClosed ? 'red' : null
     }
    } />
    {pointsComp}
   </Layer>
  )
 }


}