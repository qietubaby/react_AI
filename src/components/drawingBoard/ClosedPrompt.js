import React, { Component } from 'react';
import './style.scss'

export default class ClosedPrompt extends Component {
 constructor(props) {
  super(props);
  this.state = {

  }
 }
 render() {
  let { left, top } = this.props;
  return (
   <div className="closedPrompt" style={{ top, left }}>
    <input
     type="text"
     placeholder="name"
    />
    <textarea
     className="area"
     placeholder="attr"
     cols="30"
     rows="2"

    >

    </textarea>
    <button>done</button>
    <button>delete</button>
   </div>
  )
 }
}