import {b1Init} from './banners/girl1/b1.js';
import {b2Init} from './banners/spine/b2.js';
class BANNER {
    constructor(item, mainBlock, params, app, textures){
        this._item = item;
        this._mainBlock = mainBlock;
        this._params = params;
        this._app = app;
        this._texture = textures;
    };

    //Добавляет объекты из data в область canvas. Отрисовывает баннер
    draw(){
        this._mainBlock.removeChildren(); //Очищаем контейнер от предыдущего баннера
        const bannerContainer = new PIXI.Container();
        switch(this._item.position){
            case 1:
                b1Init(bannerContainer, this._params, this._app, this._texture);
                textUpdate(this._item);
                break;
            case 2:
                b2Init(bannerContainer, this._params, this._app, this._texture);
                textUpdate(this._item);
                break;
        };
        
        this._mainBlock.addChild(bannerContainer);
        
        return this._item.position;
    };


    //Удаляет все данные из области видимости. Используется при смене баннера и похожих кейсах.
    clean(){
        this._mainBlock.removeChildren();
    };


    //Останавливает анимацию баннера.
    stop(){};


    //Запускает анимацию баннера.
    play(){};

}



//Устанавливаем подписи к баннерам
function textUpdate(item){
    let caption = document.getElementById('caption1');
    let button = document.getElementById('btn');
    caption.innerHTML = item.caption;
    button.innerHTML = item.btn;
}

export {BANNER};