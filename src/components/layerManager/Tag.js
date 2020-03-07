import './style.scss';

import React from 'react'

export default function Tag({ layerName, active, id, AlterLayerFill, AlterLayerHold, AlterLayerSelected }) {
 return (
  <li
   className={active ? 'active' : ''}
   onClick={ev => AlterLayerSelected(id)}
   onDoubleClick={ev => AlterLayerHold(id)}

   onMouseOver={ev => {
    AlterLayerFill(id, true)
   }}
   onMouseOut={ev => {
    AlterLayerFill(id, false)
   }}
  >
   {layerName}
  </li>
 )
}