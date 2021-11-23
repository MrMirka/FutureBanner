import {CONTAINER} from './js/container.js';
import {BANNER} from './js/banner.js';
import {EFFECT} from './js/effect.js';

let app;
let params = {
    canvasSize: {
        width: document.getElementById('c').offsetWidth *  window.devicePixelRatio,
        height: document.getElementById('c').offsetHeight *  window.devicePixelRatio,
    },
    screenSize : {
        width : window.innerWidth,
        height : window.innerHeight,
    }
};
initScene();
console.log(getCanvasSize());
//Запуск экрана
function initScene(){
    app = new PIXI.Application({
        width: params.canvasSize.width,
        height: params.canvasSize.height,
        antialias: true,
        view: document.getElementById('c')
    });
    document.body.appendChild(app.view);
}

//Возвращает размер блока Canvas
function getCanvasSize(){
    return params.canvasSize;
}


//Возвращает размер окна устройства
function getCanvasSize(){
    return params.screenSize;
}


//Возвращает 0 - десктоп
//           1 - мобильное устройство
function getDeviceType(){
    if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
		return 1;
	}else{
		return 0;
	}
};