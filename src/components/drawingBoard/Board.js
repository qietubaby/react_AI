
import React, { Component } from 'react';
import { Stage, Layer, Image } from 'react-konva';
import { connect } from 'react-redux';
import { getDrewImageBodyInfo } from '../../common/util/KonvaUtil.js';
import './style.scss';
class Board extends Component {
    constructor(props) {
        super(props);

        this.stageWidth = 760;
        this.stageHeight = 500;
    }

    componentWillReceiveProps(nProp) {

    }

    render() {
        let { stageWidth, stageHeight } = this;
        let { drewImage } = this.props;
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

                </Stage>

            </div>
        );
    }
}

const mapStateToProps = (state) => {
    let { drewImage } = state.board;
    return {
        drewImage
    }
}

export default connect(
    mapStateToProps, null
)(Board)
