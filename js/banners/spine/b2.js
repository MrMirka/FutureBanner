//import {EFFECT} from '../js/effect.js';
function b2Init(bannerContainer, params, app, textures){
    app.loader.destroy(); //Нужно очистить ресурсы перед повторным запуском (временное решение)
	app.loader
    .add('rider', 'js/banners/spine/raptor/export/raptor_pro.json')
    .load(onRiderLoader);
    //app.stage.interactive = true;

    function onRiderLoader(name, res){
        const rider = new PIXI.spine.Spine(res.rider.spineData);
        rider.interactive = true;
    
        rider.skeleton.setSkinByName('default');
        rider.skeleton.setSlotsToSetupPose();
    
        rider.stateData.setMix('walk', 'roar',0.2);
        rider.stateData.setMix('roar', 'walk',0.3);
    
        rider.state.setAnimation(0, 'walk', true);
    
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
    
    
    
        //Listners
        rider.on('mouseup', () => {
            rider.state.setAnimation(0, 'walk', true);
        });
        rider.on('mousedown', () => {
            rider.state.setAnimation(0, 'roar', true);
        });
    
        rider.on('touchstart', () => {
            rider.state.setAnimation(0, 'roar', true);
        });
        rider.on('touchend', () => {
            rider.state.setAnimation(0, 'walk', true);
        });
    }
}
export {b2Init}



