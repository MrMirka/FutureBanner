import { BANNER } from './banner.js';
import {getJSON} from './json_manager.js';
let app, params;
let banners; //Массив данных из JSON файла
let bannerUrl = './data/banners/banners.json'; //Путь к JSON файлу с описанием баннеров
let currentPosition = 0; //По умолчанию стартует первый баннер в очереди

let mainBlock;

class CONTAINER {
    constructor (data){
        params = data;
    };

    //Инициализация сцены
    init(){
        app = new PIXI.Application({
            width: params.canvasSize.width,
            height: params.canvasSize.height,
            antialias: true,
            view: document.getElementById('c')
        });
        document.body.appendChild(app.view);


        mainBlock = new PIXI.Container(); //Корневой контейнер, в него помещаем контйнеры и сбаннерами (один баннер - один контейнер)
        app.stage.addChild(mainBlock);

        getObjFromJson();

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
            playerBanner(banners, 0);
        }
    };


    //Сменить банер напоследующий в очереди.
    toRight(){
        if(banners != undefined) {
            playerBanner(banners, 1);
        }
    };


    //Возвращает размер canvas.
    getCanvasSize(){
        return params.canvasSize;
    };

     //Возвращает размер canvas.
     getScreenSize(){
        return params.screenSize;
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
function getObjFromJson(){
   let loader = getJSON(bannerUrl);
   loader.onload = () => {
    banners = loader.response;
    if(banners != undefined) {
        playerBanner(banners, 1);
    }
    };
};


//Выбираем баннер из массива данных и отрисовываем его
//banners - массив баннеров
//position - позиция в массиве которая будет отрисованна
function playerBanner(banners, position){
    currentPosition = position;
    addBanner(banners[position],params);
}

 /*Создание экземпляра класса Banner с командой на отрисовку.
Конструктор принимает объект data из JSON и управляющие триггеры
отвечающие за мгновенную или отложенную отрисовку баннера.
item - объект баннера
*/
function addBanner(item, params){
    console.log(item);
    const banner = new BANNER(item, mainBlock,params, app);
    banner.draw();
};


export {CONTAINER};