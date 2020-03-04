
import React, { Component } from 'react';
import { Stage, Layer, Image } from 'react-konva';
import { connect } from 'react-redux';
import { getDrewImageBodyInfo } from '../../common/util/KonvaUtil.js';
import './style.scss';
import {
    addSpot,
    closeLine,
    addTempLayer,
    alterLayerHold,
    editLayerDone,
    alterLayerFill,
    alterLayerSelected,
    undo,
    deleteLayer
} from './store/actionCreators.js';
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

        let {
            drewImage,
            AddSpot,
            layersData,
            curtPhotoID,
            AlertCloseLine,
            AlterLayerHold,
            EditLayerDone,
            AlterLayerFill,
            AlterLayerSelected,
            Undo,
            DeleteLayer
        } = this.props;

        let layerGroup = layersData[curtPhotoID];

        if (!layerGroup) return null;

        let { layers, holdingLayerID, curtLayerID, selectedLayerID } = layerGroup;

        // 得出哪个图层要被标注
        let holdingLayer = null;

        layers = layers.map(layer => {
            let { id, points, lineColor, lineClosed, fill } = layer;

            if (holdingLayerID && holdingLayerID === id) holdingLayer = layer


            return (
                <PaintingLayer {
                    ...{
                        key: id,
                        layerID: id,
                        points,
                        lineColor,
                        fixFirstSpotHit,
                        lineClosed,
                        AlterLayerFill,
                        fill,
                        AlterLayerHold,
                        AlterLayerSelected,
                        selectedLayerID
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
                <div onClick={DeleteLayer}>测试测试啊</div>
                <Stage
                    width={stageWidth}
                    height={stageHeight}
                    ref="stage"
                    onMouseDown={ev => {
                        if (ev.target.className === 'Line') return;
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
                                top,
                                EditLayerDone,
                                holdingLayerID,
                                layerName: holdingLayer.layerName || '',
                                attr: holdingLayer.attr || '',
                                everDone: holdingLayer.everDone,
                                undo: Undo,
                                DeleteLayer
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
            const action = alterLayerHold(holdingLayerID)
            dispatch(action)
        },
        EditLayerDone(editLayerID, layerName, attr) {
            const action = editLayerDone(editLayerID, layerName, attr)
            dispatch(action)
        },
        AlterLayerFill(fillLayerID, isFill) {
            const action = alterLayerFill(fillLayerID, isFill)
            dispatch(action)
        },
        AlterLayerSelected(selectedLayerID) {
            const action = alterLayerSelected(selectedLayerID)
            dispatch(action)
        },
        Undo(undoLayerID) {
            const action = undo(undoLayerID)
            dispatch(action)
        },
        DeleteLayer(deleteLayerID) {

            const action = deleteLayer(deleteLayerID)
            dispatch(action)
        }
    }
}

export default connect(
    mapStateToProps, mapDispatchToProps
)(Board)
