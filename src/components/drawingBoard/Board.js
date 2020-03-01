
import React, { Component } from 'react';
import { Stage, Layer, Image } from 'react-konva';
import { connect } from 'react-redux';
import { getDrewImageBodyInfo } from '../../common/util/KonvaUtil.js';
import './style.scss';
import { addSpot } from './store/actionCreators.js';
import PaintingLayer from './Layer'
class Board extends Component {
    constructor(props) {
        super(props);

        this.stageWidth = 760;
        this.stageHeight = 500;
    }

    getPointerPosition() {
        return this.refs.stage.getStage().getPointerPosition()
    }

    componentWillReceiveProps(nProp) {

    }

    render() {
        let { stageWidth, stageHeight } = this;
        let { drewImage, addSpot, layersData, curtPhotoID } = this.props;

        let layerGroup = layersData[curtPhotoID];

        if (!layerGroup) return null;

        let { layers } = layerGroup;
        layers = layers.map(layer => {
            let { id, points, lineColor } = layer;
            return (
                <PaintingLayer {
                    ...{
                        key: layer.id,
                        layerID: id,
                        points,
                        lineColor
                    }
                } />
            )
        })

        let imageBodyInfo = null;
        if (drewImage) {
            let { width: imgWidth, height: imgHeight } = drewImage;
            imageBodyInfo = getDrewImageBodyInfo(imgWidth, imgHeight, stageWidth, stageHeight)
        }
        return (
            <div className="fl" >
                <Stage
                    width={stageWidth}
                    height={stageHeight}
                    ref="stage"
                    onMouseDown={ev => {
                        let { x, y } = this.getPointerPosition();
                        addSpot(x, y)
                    }

                    }
                >
                    <Layer>
                        {
                            drewImage ? (
                                <Image
                                    {...{
                                        width: imageBodyInfo.w,
                                        height: imageBodyInfo.h,
                                        x: imageBodyInfo.x,
                                        y: imageBodyInfo.y,
                                        image: drewImage
                                    }}
                                />
                            ) : null
                        }

                    </Layer>
                    {layers}
                </Stage>

            </div>
        );
    }
}

const mapStateToProps = (state) => {
    let { drewImage, layersData } = state.board;
    let { curtPhoto: { id } } = state.photos;
    return {
        drewImage,
        layersData,
        curtPhotoID: id
    }
}

const mapDispatchToProps = (dispatch) => {

    return {
        addSpot(x, y) {
            const action = addSpot(x, y)
            dispatch(action)
        }
    }
}

export default connect(
    mapStateToProps, mapDispatchToProps
)(Board)
