
export function fitStageIntoParentContainer(container, stageWidth, stageHeight, stage) {

    // now we need to fit stage into parent
    let containerWidth = container.offsetWidth;
    // to do this we need to scale the stage
    let scale = containerWidth / stageWidth;
    stage.width(stageWidth * scale);
    stage.height(stageHeight * scale);
    stage.scale({ x: scale, y: scale });
    stage.draw();
}

export function getDrewImageBodyInfo(imgW, imgH, cvsW, cvsH){

    let res = {};

    let stageRatio = cvsW/cvsH,
        imgRatio = imgW/imgH;

    if( imgRatio < stageRatio ){

        let scale = cvsH/imgH;

        res.w = imgW * scale;
        res.h = cvsH;
        res.x = ( cvsW - res.w ) / 2;
        res.y = 0;
        res.scale = scale;

    }else{

        let scale = cvsW/imgW;

        res.w = cvsW;
        res.h = imgH * scale;
        res.x = 0;
        res.y = ( cvsH - res.h ) / 2;
        res.scale = scale;

    }

    return res;
}

export function getRectToImg(currentX, currentY, result){
    let {x, y, scale} = result;

    let disW = (currentX - x) * scale;
    let disT = (currentY - y) * scale;

    return {disW, disT};

}
