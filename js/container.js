import { BANNER } from './banner.js';
import {getJSON} from './json_manager.js';
let app;
let banners; //Массив данных из JSON файла
let bannerUrl = './data/banners/banners.json'; //Путь к JSON файлу с описанием баннеров
let currentPosition = 0; //По умолчанию стартует первый баннер в очереди
let textures = []; //Хранилище текстур для всех баннеров

let mainBlock; //Корневой контеинер

class CONTAINER {
    constructor (params){
        this._params = params;
    };

    //Инициализация сцены
    init(){
        app = new PIXI.Application({
            width: this._params.canvasSize.width,
            height: this._params.canvasSize.height,
            antialias: true,
            view: document.getElementById('c')
        });
        document.body.appendChild(app.view);

        mainBlock = new PIXI.Container(); //Корневой контейнер, в него помещаем контйнеры и сбаннерами (один баннер - один контейнер)
        app.stage.addChild(mainBlock);

        getObjFromJson(this._params); //Забираем данные банеров и отправляем на инициализацию

    }

    //Удаляет экземпляр класса из очереди на отображение.
    removeBanner(){};


    //Возвращает активный баннер, позицию в очереди, а так же его тип.
    getInfo(){
        return banners[currentPosition];
    };


    //Изменяет позицию баннера в очереди.
    shiftPosition(){};


    //Сменить банер на предыдущий в очереди.
    toLeft(){
        if(banners != undefined) {
            playerBanner(banners, 1, this._params);
        }
    };


    //Сменить банер напоследующий в очереди.
    toRight(){
        if(banners != undefined) {
            playerBanner(banners, 0, this._params);
        }
    };


    //Возвращает размер canvas.
    getCanvasSize(){
        return this._params.canvasSize;
    };

     //Возвращает размер canvas.
     getScreenSize(){
        return this._params.screenSize;
    };


    //Поиск баннеров
    findBanners(){};


    //Управление подписями к баннерам за пределами блока canvas.
    setCuption(){};


    //Запуск эффекта при смене баннера.
    startTransition(){};


    //Запускается при изменении размера окна, с последующей перерисовкой баннера.
    update(){};


    //Возвращает сцену
    getContext(){
        return app;
    }
}

//Возвращает массив объектов bannerData. (путь к данным баннера на диске, тип баннера).
//Инициируем отрисовку банеров
function getObjFromJson(params){
   let loader = getJSON(bannerUrl);
   loader.onload = () => {
    banners = loader.response;
    if(banners != undefined) {
        loaderTextures(banners, params);
    }
    };
};


//Выбираем баннер из массива данных и отрисовываем его
//banners - массив баннеров
//position - позиция в массиве которая будет отрисованна
function playerBanner(banners, position, params){
    currentPosition = position;
    addBanner(banners[position],params);
}

 /*Создание экземпляра класса Banner с командой на отрисовку.
Конструктор принимает объект data из JSON и управляющие триггеры
отвечающие за мгновенную или отложенную отрисовку баннера.
item - объект баннера
*/
function addBanner(item, params){
    const banner = new BANNER(item, mainBlock, params, app, textures);
    banner.draw();
};



//Загружаем картинки в массив текстур
function loaderTextures(bannerItem, params) {
    const loader = new PIXI.Loader();
    for (let i = 0; i < bannerItem.length; i++) {
       for(let j = 0; j<bannerItem[i].img.length; j++){
           let value = bannerItem[i].img[j];
            loader.add(Object.keys(value)[0], Object.values(value)[0]);
       }
    }
    loader.load((loader, resources) => {
        for(let i = 0; i < Object.keys(resources).length; i++) {
            let value = Object.values(resources)[i].texture;
            textures.push(value);
        }
        playerBanner(bannerItem, 1, params);
    });
}


export {CONTAINER};