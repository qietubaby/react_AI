import React, { Component } from 'react';
import './style.scss';

import { connect } from 'react-redux';

import { changeShape } from './store/actionCreators'

class ToolBox extends Component {
    render() {
        let { shape, ChangeShape } = this.props;
        return (
            <ul className="toolButton">
                <li>
                    <i></i>
                    放大
                </li>
                <li>
                    <i></i>
                    缩小
                </li>
                <li>
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
        }

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ToolBox)