
import React, { Component } from 'react';
import { Stage, Layer, Image } from 'react-konva';
import { connect } from 'react-redux';
import { getDrewImageBodyInfo } from '../../common/util/KonvaUtil.js';
import './style.scss';
class Board extends Component {
    constructor(props) {
        super(props);
        this.state = {
            image: null
        }
        this.stageWidth = 760;
        this.stageHeight = 500;
    }

    componentWillReceiveProps(nProp) {
        this.loadImage(nProp.curtPhoto.src)
    }

    loadImage(url) {
        let imgObj = new window.Image();
        imgObj.onload = () => {
            this.setState({
                image: imgObj
            })
        }
        imgObj.src = url;

    }

    render() {
        let { stageWidth, stageHeight } = this;
        let { image } = this.state;
        let iamgeBodyInfo = null;
        if (image) {
            let { width: imgWidth, height: imgHeight } = image;
            iamgeBodyInfo = getDrewImageBodyInfo(imgWidth, imgHeight, stageWidth, stageHeight)
        }

        return (
            <div className="fl" >
                <Stage
                    width={stageWidth}
                    height={stageHeight}
                >
                    <Layer>
                        {
                            image ? (
                                <Image
                                    {...{
                                        width: iamgeBodyInfo.w,
                                        height: iamgeBodyInfo.h,
                                        x: iamgeBodyInfo.x,
                                        y: iamgeBodyInfo.y,
                                        image
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

    let { curtPhoto } = state.photos;
    return { curtPhoto }
}

export default connect(
    mapStateToProps, null
)(Board)
