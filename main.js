import {CONTAINER} from './js/container.js';

let params = {
    steps: [2,1],
    canvasSize: {
        width: document.getElementById('c').offsetWidth,
        height: document.getElementById('c').offsetHeight,
    },
    screenSize : {
        width : window.innerWidth,
        height : window.innerHeight,
    },
    deviceType: getDeviceType()
};


//Инициируем корневой блок
const mainBlock = new CONTAINER(params);
mainBlock.init();
initUi();


//Возвращает 0 - десктоп
//           1 - мобильное устройство
function getDeviceType(){
    if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
		return 1;
	}else{
		return 0;
	}
};


//Отрисовка элементов управления
function initUi(){
    const left = new PIXI.Graphics();
    left.interactive = true;
    left.buttonMode = true;
    left.beginFill(0xff0000);
    left.drawRect(0, params.canvasSize.height /2 - 50, 50,50);
    left.on("pointerdown", (event) => {
        mainBlock.toLeft();
    });

    const right = new PIXI.Graphics();
    right.interactive = true;
    right.buttonMode = true;
    right.on("pointerdown", (event) => {
        mainBlock.toRight();
    });
    right.beginFill(0x00ff00);
    right.drawRect(params.canvasSize.width - 50, params.canvasSize.height /2 - 50  , 50,50);

    const app = mainBlock.getContext();
    
    app.stage.interactive = true;
    app.stage.addChild(left, right);
};




