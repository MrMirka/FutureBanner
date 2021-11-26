import {b1Init} from './banners/b1.js';
import {b2Init} from './banners/b2.js';
import {b3Init} from './banners/girl1/b3.js';
let item, block, params,app;
class BANNER {
    constructor(data, mainBlock, mainData, application){
        item = data;
        block = mainBlock;
        params = mainData;
        app = application;
    };

    //Добавляет объекты из data в область canvas. Отрисовывает баннер
    draw(){
        block.removeChildren(); //Очищаем контейнер от предыдущего баннера
        const bannerContainer = new PIXI.Container();
        switch(item.position){
            case 1:
                b1Init(bannerContainer, params, app);
                break;
            case 2:
                b3Init(bannerContainer, params, app);
                break;
        };
        
        block.addChild(bannerContainer);
        
    };


    //Удаляет все данные из области видимости. Используется при смене баннера и похожих кейсах.
    clean(){};


    //Останавливает анимацию баннера.
    stop(){};


    //Запускает анимацию баннера.
    play(){};


    //Добавляет в сцену экземпляр класса Effects. 
    addEfect(){};
}
export {BANNER};