
import React, { Component } from 'react';
import { Stage, Layer, Rect, Image } from 'react-konva';
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
    deleteLayer,
    movePoint,
    moveLayer,
    genRect
} from './store/actionCreators.js';
import PaintingLayer from './Layer'
import ClosedPrompt from './ClosedPrompt';
class Board extends Component {
    constructor(props) {
        super(props);

        // 第一个点有没有被碰到，用来判断是否闭合线
        this.state = {


            // 记录点的索引，碰上第一个点就代表闭合
            overPointIndex: null
        }


        this.stageWidth = 760;
        this.stageHeight = 500;

        this.dragLimitControl = 8;

        this.clickTime = 0;

        this.fixSpotHitIndex = this.fixSpotHitIndex.bind(this);
    }

    fixSpotHitIndex(index) {
        this.setState({
            overPointIndex: index
        })
    }

    getPointerPosition() {
        return this.refs.stage.getStage().getPointerPosition()
    }

    componentWillReceiveProps(nProp) {

    }

    render() {

        let { stageWidth, stageHeight, fixSpotHitIndex } = this;

        let { overPointIndex } = this.state;

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
            DeleteLayer,
            MovePoint,
            MoveLayer,
            shape,
            GenRect
        } = this.props;

        let layerGroup = layersData[curtPhotoID];

        if (!layerGroup) return null;

        let { layers, holdingLayerID, curtLayerID, selectedLayerID } = layerGroup;

        // 得出哪个图层要被标注
        let holdingLayer = null;
        let curtLayer = null;

        layers = layers.map(layer => {


            let { id, points, lineColor, lineClosed, fill } = layer;

            if (holdingLayerID && holdingLayerID === id) holdingLayer = layer
            if (curtLayerID && curtLayerID === id) curtLayer = layer


            return (
                <PaintingLayer {
                    ...{
                        key: id,
                        layerID: id,
                        points,
                        lineColor,
                        lineClosed,
                        AlterLayerFill,
                        fill,
                        AlterLayerHold,
                        AlterLayerSelected,
                        selectedLayerID,
                        fixSpotHitIndex,
                        overPointIndex,
                        MovePoint,
                        MoveLayer,
                        stageWidth,
                        stageHeight,
                        curtLayerID,
                        shape,

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

                        let { className } = ev.target
                        if (className === 'Line') return;
                        if (selectedLayerID && className === 'Image') {
                            console.log(selectedLayerID)
                            AlterLayerSelected(null)
                            return
                        }
                        let { x, y } = this.getPointerPosition();

                        if (shape === 0) {
                            // overPointIndex 【再次】 等于 0 和 点的数量大于2的时候就可以闭合了
                            if (overPointIndex === 0 && curtLayer.points.length > 2) {

                                //闭合线条并且创建新的图层
                                AlertCloseLine(true)

                                // 闭合后给这个图层添加标注
                                AlterLayerHold(curtLayerID)

                                //AddTempLayer(curtPhotoID)
                            } else {
                                if (ev.target.className === 'Circle') return;
                                AddSpot(x, y)
                            }
                        }
                        if (shape === 1) {

                            if (this.clickTime === 0) {
                                if (ev.target.className === 'Circle') return;
                                GenRect(x, y);

                                this.clickTime++;

                            } else {
                                alterLayerHold(curtLayerID);
                                this.clickTime = 0;

                            }

                        }



                    }

                    }

                    onMouseMove={ev => {

                        if (shape === 0) return;

                        if (holdingLayerID) return;

                        if (this.clickTime !== 1) return;

                        let { x, y } = this.getPointerPosition();

                        if (x < this.dragLimitControl || y < this.dragLimitControl || x > stageWidth || y > stageHeight) return;

                        MovePoint(curtLayerID, 0, x, y);

                        MovePoint(curtLayerID, 1, null, y);

                        MovePoint(curtLayerID, 3, x, null);



                    }}

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
    let { shape } = state

    let { drewImage, layersData } = state.board;
    let { curtPhoto: { id } } = state.photos;
    return {
        shape,
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
        },
        MovePoint(pointMoveLayerID, pointIndx, pointX, pointY) {

            const action = movePoint(pointMoveLayerID, pointIndx, pointX, pointY)
            dispatch(action)
        },
        MoveLayer(points, moveLayerID) {
            const action = moveLayer(points, moveLayerID)
            dispatch(action)
        },
        GenRect(x, y) {
            const action = genRect(x, y)
            dispatch(action)
        }
    }
}

export default connect(
    mapStateToProps, mapDispatchToProps
)(Board)
