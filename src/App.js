import React, { Component } from 'react';
import './common/style/main.scss';
import './style.scss'


import Board from './components/drawingBoard/Board';
import PhotoGallery from './components/photoGallery/PhotoGallery';
import ToolBox from './components/toolBox/ToolBox';
import LayerManager from './components/layerManager/LayerManager';


class App extends Component {
  render() {
    return (
      <div className="gridWrap">
        <div className="topRow">
          <div className="logo">
            <div className="imgWrap">
              <a href="http://art.microbu.com"><img src={require("./common/img/logo.png")} alt="miaov.com" /></a>
            </div>
          </div>
          <div className="gallery">
            <PhotoGallery />
          </div>
        </div>
        <div className="bottomRow">
          <div className="tool">
            <ToolBox />
          </div>
          <div className="board">
            <Board />
            <LayerManager />
          </div>
        </div>
      </div>
    );
  }
}

export default App
