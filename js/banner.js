import {b1Init} from './banners/girl1/b1.js';
import {b2Init} from './banners/spine/b2.js';
let item, block, params,app, texture;
class BANNER {
    constructor(data, mainBlock, mainData, application, textures){
        item = data;
        block = mainBlock;
        params = mainData;
        app = application;
        texture = textures;
    };

    //Добавляет объекты из data в область canvas. Отрисовывает баннер
    draw(){
        block.removeChildren(); //Очищаем контейнер от предыдущего баннера
        const bannerContainer = new PIXI.Container();
        switch(item.position){
            case 1:
                b2Init(bannerContainer, params, app);
                textUpdate();
                break;
            case 2:
                b1Init(bannerContainer, params, app, texture);
                textUpdate();
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



//Устанавливаем подписи к баннерам
function textUpdate(){
    let caption = document.getElementById('caption1');
    let button = document.getElementById('btn');
    caption.innerHTML = item.caption;
    button.innerHTML = item.btn;
}

export {BANNER};