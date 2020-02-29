
import React, { Component } from 'react';
import { Stage, Layer, Rect } from 'react-konva';
import './style.scss';
export default class Board extends Component {
    render() {
        return (
            <div className="fl" >
                <Stage
                    width={760}
                    height={500}
                >
                    <Layer>
                        <Rect
                            {...{
                                width: 100,
                                height: 50,
                                x: 50,
                                y: 50,
                                fill: 'red'
                            }}
                        />
                    </Layer>

                </Stage>

            </div>
        );
    }
}
