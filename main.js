import {CONTAINER} from './js/container.js';
import {BANNER} from './js/banner.js';
import {EFFECT} from './js/effect.js';

let params = {
    canvasSize: {
        width: document.getElementById('c').offsetWidth *  window.devicePixelRatio,
        height: document.getElementById('c').offsetHeight *  window.devicePixelRatio,
    },
    screenSize : {
        width : window.innerWidth,
        height : window.innerHeight,
    },
    deviceType: getDeviceType()
};


//Инициируем корневой блок
new CONTAINER(params).init();


//Возвращает 0 - десктоп
//           1 - мобильное устройство
function getDeviceType(){
    if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
		return 1;
	}else{
		return 0;
	}
};