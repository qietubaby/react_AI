
import React, { Component } from 'react';
import { Stage, Layer, Image } from 'react-konva';
import { connect } from 'react-redux';
import { getDrewImageBodyInfo } from '../../common/util/KonvaUtil.js';
import './style.scss';
import { addSpot, closeLine, addTempLayer, alterLayerHold } from './store/actionCreators.js';
import PaintingLayer from './Layer'
import ClosedPrompt from './ClosedPrompt';
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

        let { drewImage, AddSpot, layersData, curtPhotoID, AlertCloseLine, AddTempLayer, AlterLayerHold } = this.props;

        let layerGroup = layersData[curtPhotoID];

        if (!layerGroup) return null;

        let { layers, holdingLayerID, curtLayerID } = layerGroup;

        // 得出哪个图层要被标注
        let holdingLayer = null;

        layers = layers.map(layer => {
            let { id, points, lineColor, lineClosed } = layer;

            if (holdingLayerID && holdingLayerID === id) holdingLayer = layer


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


        // 计算出 ClosedPrompt 的 left 和 top

        let { x: left, y: top } = holdingLayer ? holdingLayer.points[0] : { x: 0, y: 0 }



        left = stageWidth - left > 240 ? left : left - 230
        top = stageHeight - top > 210 ? top : top - 200

        // end 计算出 ClosedPrompt 的 left 和 top


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

                            // 闭合后给这个图层添加标注
                            AlterLayerHold(curtLayerID)

                            //AddTempLayer(curtPhotoID)
                        } else {
                            AddSpot(x, y)
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
                {
                    holdingLayer ? (
                        <ClosedPrompt {
                            ...{
                                left,
                                top
                            }
                        } />
                    ) : null

                }
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
        AddSpot(x, y) {
            const action = addSpot(x, y)
            dispatch(action)
        },
        AlertCloseLine(status) {
            const action = closeLine(status)
            dispatch(action)
        },
        AddTempLayer(curtPhotoID) {
            const action = addTempLayer(curtPhotoID)
            dispatch(action)
        },
        AlterLayerHold(holdingLayerID) {
            console.log('11111111', holdingLayerID)
            const action = alterLayerHold(holdingLayerID)
            dispatch(action)
        }
    }
}

export default connect(
    mapStateToProps, mapDispatchToProps
)(Board)
