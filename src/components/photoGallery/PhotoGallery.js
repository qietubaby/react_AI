import React, { Component } from 'react';
import { Button, List, Container } from 'semantic-ui-react';
import { connect } from 'react-redux';
import './style.scss';
import Img from './Img';
import { actionCreators } from './store';
import { switchPhoto } from './store/actionCreators';


class PhotoGallery extends Component {
    componentDidMount() {
        this.props.loadImage(this.props.curtPhoto)
    }
    render() {
        let { imgData, switchPhoto, curtPhoto, nextPhoto, previousPhoto } = this.props
        return (
            <Container textAlign="center" className="container">
                <Button onClick={() => previousPhoto(imgData, curtPhoto)} basic icon='chevron left' size="massive" className="button" />
                <List horizontal className="listWrap">
                    {

                        imgData.map(photo => (
                            <Img
                                {...{
                                    key: photo.id,
                                    photo,
                                    switchPhoto,
                                    active: curtPhoto.id === photo.id
                                }}
                            />
                        ))
                    }
                </List>
                <Button onClick={() => nextPhoto(imgData, curtPhoto)} basic icon='chevron right' size="massive" className="button" />
            </Container>
        );
    }
}


let imgData = [
    { id: Math.random(), src: require("../../common/img/2.jpg") },
    { id: Math.random(), src: require("../../common/img/3.jpg") },
    { id: Math.random(), src: require("../../common/img/4.jpg") },
    { id: Math.random(), src: require("../../common/img/5.jpg") },
    { id: Math.random(), src: require("../../common/img/1.jpg") }
];

const mapStateToProps = (state) => {
    let { photos: { imgData, curtPhoto } } = state;
    return {
        imgData,
        curtPhoto
    }
}



const mapDispatchToProps = (dispatch) => {
    return {
        loadImage(curtPhoto) {
            const action = actionCreators.loadImage(imgData)
            dispatch(action)
            //刚加载完图片，选择第一张图片为默认选中的
            if (!curtPhoto.id) {
                const action2 = actionCreators.switchPhoto(imgData[0])
                dispatch(action2)
            }
        },
        switchPhoto(photo) {
            console.log(55555555, photo)
            const action = actionCreators.switchPhoto(photo)
            dispatch(action)

            // 向画布中画大图片

        },
        nextPhoto(imgData, curtPhoto) {
            let { id } = curtPhoto
            imgData.forEach((photo, i, arr) => {
                if (id === photo.id && i < arr.length - 1) {
                    dispatch(switchPhoto(arr[i + 1]))
                }
            })
        },
        previousPhoto(imgData, curtPhoto) {
            let { id } = curtPhoto
            imgData.forEach((photo, i, arr) => {
                if (id === photo.id && i > 0) {
                    dispatch(switchPhoto(arr[i - 1]))
                }
            })
        },

    }
}

export default connect(
    mapStateToProps, mapDispatchToProps
)(PhotoGallery)
