function b3Init(bannerContainer, params, app, textures){
    app.loader.destroy(); //Нужно очистить ресурсы перед повторным запуском (временное решение)
	app.loader
    .add('rider', 'js/banners/spine2/stretchyman/export/stretchyman-pro.json')
    .load(onRiderLoader);

    function onRiderLoader(name, res){
        const rider = new PIXI.spine.Spine(res.rider.spineData);
        rider.interactive = true;
    
        rider.skeleton.setSkinByName('default');
        rider.skeleton.setSlotsToSetupPose();
    
    
        rider.state.setAnimation(0, 'sneak', true);
    
        const cage = new PIXI.Container();
        cage.addChild(rider);
    
        const localRect = rider.getLocalBounds();
        rider.position.set(-localRect.x, -localRect.y);
    
        const scale = Math.min(
            (app.screen.width * 0.85) / cage.width,
             (app.screen.height * 0.85) / cage.height);  
    
        cage.scale.set(scale, scale);
        cage.position.set(
            (app.screen.width - cage.width) * 0.5,
            (app.screen.height - cage.height) * 0.5);
            bannerContainer.addChild(cage);   
    
    }
}
export {b3Init}



