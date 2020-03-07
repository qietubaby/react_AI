import './style.scss';
import React, { Component } from 'react';
import { connect } from 'react-redux';

import { alterLayerFill, alterLayerHold, alterLayerSelected } from '../drawingBoard/store/actionCreators';
import Tag from './Tag';

class LayerManager extends Component {


    render() {
        let { layersData, curtPhotoID, AlterLayerFill, AlterLayerHold, AlterLayerSelected } = this.props;
        let tags = null;
        let layerGroup = layersData[curtPhotoID]

        if (layerGroup) {
            let { layers, selectedLayerID } = layerGroup;
            tags = layers.map(layer => {
                let { id, layerName, everDone } = layer;
                if (!everDone) return false
                return (
                    <Tag
                        {...{
                            key: id,
                            id,
                            layerName,
                            active: selectedLayerID === id,
                            AlterLayerFill,
                            AlterLayerHold,
                            AlterLayerSelected
                        }

                        }></Tag>
                )
            })

        }


        return (
            <div>
                <ul className="showData">
                    {tags}
                </ul>
            </div>
        );
    }
}
const mapStateToProps = (state) => {
    let { board: { layersData }, photos: { curtPhoto } } = state;
    return {
        layersData, curtPhotoID: curtPhoto.id
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        AlterLayerFill(id, bl) {
            const action = alterLayerFill(id, bl)
            dispatch(action)
        },
        AlterLayerHold(id) {
            const action = alterLayerHold(id)
            dispatch(action)
        },
        AlterLayerSelected(id) {
            const action = alterLayerSelected(id)
            dispatch(action)
        }
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(LayerManager)
