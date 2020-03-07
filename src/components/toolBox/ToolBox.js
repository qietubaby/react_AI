import React, { Component } from 'react';
import './style.scss';

import { connect } from 'react-redux';

import { changeShape } from './store/actionCreators'

import { adaptStage, incrementStage, decrementStage } from '../drawingBoard/store/actionCreators';

class ToolBox extends Component {
    render() {
        let { shape, ChangeShape, AdaptStage, IncrementStage, DecrementStage } = this.props;
        return (
            <ul className="toolButton">
                <li
                    onClick={ev => IncrementStage()}
                >
                    <i></i>
                    放大
                </li>
                <li
                    onClick={ev => DecrementStage()}
                >
                    <i></i>
                    缩小
                </li>
                <li
                    onClick={ev => AdaptStage()}
                >
                    <i></i>
                    适应
                </li>
                <li className={shape === 0 ? 'active' : ''}
                    onClick={ev => ChangeShape(0)}
                >
                    <i></i>
                    点描

                </li>
                <li className={shape === 1 ? 'active' : ''}

                    onClick={ev => ChangeShape(1)}>
                    <i></i>
                    框选
                </li>

                <li>
                    <i></i>
                    上一步
                </li>
            </ul>
        );
    }
}

const mapStateToProps = (state) => {

    let { shape } = state
    return {
        shape
    }
}

const mapDispatchToProps = (dispatch) => {

    return {
        ChangeShape(shape) {
            const action = changeShape(shape)
            dispatch(action)
        },
        AdaptStage() {
            const action = adaptStage()
            dispatch(action)
        },
        IncrementStage() {
            const action = incrementStage()
            dispatch(action)
        },
        DecrementStage() {
            const action = decrementStage()
            dispatch(action)
        }

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ToolBox)