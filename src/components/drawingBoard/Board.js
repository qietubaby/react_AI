
import React, { Component } from 'react';
import { Stage, Layer, Image } from 'react-konva';
import { connect } from 'react-redux';
import { getDrewImageBodyInfo } from '../../common/util/KonvaUtil.js';
import './style.scss';
import { addSpot, closeLine, addTempLayer } from './store/actionCreators.js';
import PaintingLayer from './Layer'
class Board extends Component {
    constructor(props) {
        super(props);

        // 第一个点有没有被碰到，用来判断是否闭合线
        this.state = {
            firstSpotHit: false
        }


        this.stageWidth = 760;
        this.stageHeight = 500;

        this.fixFirstSpotHit = this.fixFirstSpotHit.bind(this);
    }

    fixFirstSpotHit(hasHit) {
        this.setState({
            firstSpotHit: hasHit
        })
    }

    getPointerPosition() {
        return this.refs.stage.getStage().getPointerPosition()
    }

    componentWillReceiveProps(nProp) {

    }

    render() {
        let { stageWidth, stageHeight, fixFirstSpotHit } = this;

        let { firstSpotHit } = this.state;

        let { drewImage, addSpot, layersData, curtPhotoID, AlertCloseLine, addTempLayer } = this.props;

        let layerGroup = layersData[curtPhotoID];

        if (!layerGroup) return null;

        let { layers } = layerGroup;
        layers = layers.map(layer => {
            let { id, points, lineColor, lineClosed } = layer;
            return (
                <PaintingLayer {
                    ...{
                        key: layer.id,
                        layerID: id,
                        points,
                        lineColor,
                        fixFirstSpotHit,
                        lineClosed
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
                        if (firstSpotHit) {
                            //闭合线条并且创建新的图层
                            AlertCloseLine(true)
                            addTempLayer(curtPhotoID)
                        } else {
                            addSpot(x, y)
                        }

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
        },
        AlertCloseLine(status) {
            const action = closeLine(status)
            dispatch(action)
        }
        ,
        addTempLayer(curtPhotoID) {
            const action = addTempLayer(curtPhotoID)
            dispatch(action)
        }
    }
}

export default connect(
    mapStateToProps, mapDispatchToProps
)(Board)
