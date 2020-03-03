import React, { Component } from 'react';
import './style.scss'

export default class ClosedPrompt extends Component {
 constructor(props) {
  super(props);
  this.state = {
   layerName: props.layerName,
   attr: props.attr
  }
  this.editDone = this.editDone.bind(this)
 }

 editDone(ev) {
  ev.preventDefault();
  ev.stopPropagation();
  let { holdingLayerID, EditLayerDone } = this.props;
  let { layerName, attr } = this.state;
  if (!layerName || Number(layerName) === 0) {
   window.alert('你应该填写一个名字');
   return;
  }

  EditLayerDone(holdingLayerID, layerName, attr)

 }

 render() {

  let { editDone } = this;
  let { layerName, attr } = this.state;
  let { left, top } = this.props;

  return (
   <div className="closedPrompt" style={{ top, left }}>
    <input
     type="text"
     placeholder="name"
     value={layerName}
     onChange={ev => this.setState({ layerName: ev.target.value || '' })}
    />
    <textarea
     className="area"
     placeholder="attr"
     onChange={ev => this.setState({ attr: ev.target.value || '' })}
     cols="30"
     rows="2"
     value={attr}

    >

    </textarea>
    <button onClick={editDone}>done</button>
    <button>delete</button>
   </div>
  )
 }
}