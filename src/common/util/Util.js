

export function finishFirst(layers, curt) {

    return layers.reduce((accu,elt)=>{
        return accu.id===curt ? accu : elt
    }, layers[0]).points.length !== 0;
}

export function hintFinish() {
    window.alert('请先完成标注')
}
