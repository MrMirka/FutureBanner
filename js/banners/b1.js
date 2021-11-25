function b1Init(bannerContainer, params, app){
    let box = new PIXI.Graphics();
    box.beginFill(0xFF0025);
    box.drawRect(params.canvasSize.width / 2, params.canvasSize.height / 2, 200, 200);
    box.pivot.x = box.width /2;
    box.pivot.y = box.height /2;
    bannerContainer.pivot.x = params.canvasSize.width / 2;
    bannerContainer.pivot.y = params.canvasSize.height / 2;
    bannerContainer.position.x = params.canvasSize.width / 2;
    bannerContainer.position.y = params.canvasSize.height / 2;
    bannerContainer.addChild(box);
    

    app.ticker.add(() => {
        bannerContainer.rotation +=0.1;
    });
    

}
export {b1Init};
