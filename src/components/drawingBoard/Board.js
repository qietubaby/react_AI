
import React, { Component } from 'react';
import { Stage, Layer, Image } from 'react-konva';
import { connect } from 'react-redux';
import './style.scss';
class Board extends Component {
    constructor(props) {
        super(props);
        this.state = {
            image: null
        }
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
        let { image } = this.state;
        return (
            <div className="fl" >
                <Stage
                    width={760}
                    height={500}
                >
                    <Layer>
                        <Image
                            {...{
                                width: 100,
                                height: 50,
                                x: 50,
                                y: 50,
                                image
                            }}
                        />
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
