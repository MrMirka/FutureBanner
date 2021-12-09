import { BANNER } from './banner.js';
import { getJSON } from './json_manager.js';
import { simpleDark } from "../data/effects/simpleDark.js";
let app;
let banners; //Массив данных из JSON файла
let bannerUrl = './data/banners/banners.json'; //Путь к JSON файлу с описанием баннеров
let currentBanner; //По умолчанию стартует первый баннер в очереди
let textures = []; //Хранилище текстур для всех баннеров

let mainBlock; //Корневой контеинер

let parameters; //Общие параметры канваса

let shift = 1; //Значение альфы для перехода между баннерами
let filter; //Фильтр-шейдер области перехода между баннерами
let callback; //Возвращает значение когда транзишн перехода затемнен

let allData = false; //Флаг указывающий на окончание загрузки баннеров

let endTransition = true; //Указывает на окончание эффекта перехода


class CONTAINER {
    constructor (params){
        parameters = params;
        currentBanner = parameters.steps[0];
    };

    //Инициализация сцены
    init(){
        app = new PIXI.Application({
            width: parameters.canvasSize.width,
            height: parameters.canvasSize.height,
            antialias: true,
            view: document.getElementById('c')
        });
        document.body.appendChild(app.view);

        mainBlock = new PIXI.Container(); //Корневой контейнер, в него помещаем контйнеры и сбаннерами (один баннер - один контейнер)
        //mainBlock.scale.set(parameters.scaleFactor, parameters.scaleFactor); //Маштабирует изображения при изменении исходного размера контейнере
        
        app.stage.addChild(mainBlock);

        getObjFromJson(parameters); //Забираем данные банеров и отправляем на инициализацию
        
        /*
        let canvas = app.renderer.view;
     
        let gl = canvas.getContext('webgl2');
        console.log(gl.getFragDataLocation());
        */
        
    }



    //Возвращает активный баннер, позицию в очереди, а так же его тип.
    getInfo(){
        return banners[currentBanner];
    };



    //Сменить банер на предыдущий в очереди.
    toLeft(button){
        if(banners != undefined) {
            if(endTransition) {
                shiftBanner(-1, button);
            }
        }
    };


    //Сменить банер напоследующий в очереди.
    toRight(button){
        if(banners != undefined) {
            if(endTransition) {
                shiftBanner(1, button);
            }

        }
    };


    startAuto(interval){
        setTimeout(
            setInterval(()=>{
                if(!allData) return;
                shiftBanner(1)
            }, interval),
            5000);
    }


    //Возвращает размер canvas.
    getCanvasSize(){
        return parameters.canvasSize;
    };

     //Возвращает размер canvas.
     getScreenSize(){
        return parameters.screenSize;
    };


    //Поиск баннеров
    findBanners(){};


    //Управление подписями к баннерам за пределами блока canvas.
    setCuption(){};


    //Запуск эффекта при смене баннера.
    startTransition(shift){
        let value;
        switch(shift){
            case 1: 
                value = simpleDark(parameters);
                initBgTransition(value);
                easyOut();
                break;
            default:
                value = simpleDark(parameters);   
                initBgTransition(value);
                easyOut();
                break; 
        };
    };


    //Запускается при изменении размера окна, с последующей перерисовкой баннера.
    update(){};



    //Удаление баннера из очереди по 
    deleteBannerById(id){
        let position = findBannerInQueue(id, parameters);
        parameters.steps.splice(position, 1);
    }


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
function playerBanner(banner, params){
    addBanner(banner,params);
}

 /*Создание экземпляра класса Banner с командой на отрисовку.
Конструктор принимает объект data из JSON и управляющие триггеры
отвечающие за мгновенную или отложенную отрисовку баннера.
item - объект баннера
*/
function addBanner(item, params){
    const banner = new BANNER(item, mainBlock, params, app, textures);
    currentBanner = banner.draw();
};



//Загружаем картинки в массив текстур
function loaderTextures(bannerItem, params) {
    const loader = new PIXI.Loader();
    for (let i = 0; i < bannerItem.length; i++) {
       for(let j = 0; j < bannerItem[i].img.length; j++){
           let value = bannerItem[i].img[j];
            loader.add(Object.keys(value)[0], Object.values(value)[0]);
       }
    }
    loader.load((loader, resources) => {
        for(let i = 0; i < Object.keys(resources).length; i++) {
            let value = Object.values(resources)[i].texture;
            textures.push(value);
            allData = true;
        }
        playerBanner(getBannerByPosition(currentBanner), params);
    });
}


//Возвращет позицию банера в очереди по его ID
function findBannerInQueue(id, params){
    let queue = params.steps;
    let index = queue.findIndex((element) => element === id);
    return index;
}



//Возвращеет элемент баннера по значению position
function getBannerByPosition(pos) {
    let banner = -1;
    banners.forEach(item => {
        if(item.position === pos){
            banner = item;
        }
    });
    return banner;
}


//Сдвиг баннера на позицию влево или вправо
function shiftBanner(shift, button){
    if(banners === undefined) return;
    let nextPosition;
    let currentInQueue = findBannerInQueue(currentBanner, parameters);
    let step = currentInQueue + shift;
    if(step > parameters.steps.length-1) {
        nextPosition = parameters.steps[0];
    }else{
        nextPosition = parameters.steps[step];
    }
    if(nextPosition != undefined) {
        let banner = getBannerByPosition(nextPosition);
        if(button != undefined)
        button.interactive = false;
        easyIn(function fn(shift){
            easyOut();
            playerBanner(banner, parameters);  
            if(button != undefined)
            button.interactive = true;
        });        
    }
}



//Прозрачность от 1 к 0
function easyOut(){
    filter.uniforms.shift = shift;
    shift -= 0.01;
    if(shift > 0) {
        requestAnimationFrame(easyOut);
        endTransition = true; 
    }
}


//Прозрачность от 0 к 1
 function easyIn(fn){
    endTransition = false; 
    if(callback === undefined) 
    callback = fn;
    filter.uniforms.shift = shift;
    shift += 0.01;
    if(shift < 1){
        requestAnimationFrame(easyIn);
    }else if(shift >= 1) {
        callback(shift); 
        callback = undefined; //Обнуление калбека (иначе будет показывать тот же баннер при клике на стрелку)
    }
}



//Инициируекм шейдер для эффекта перехода
function initBgTransition(value){
    parameters.filter =  new PIXI.Filter(undefined, value.f, value.u);
    var bg = new PIXI.Sprite();
    bg.width = parameters.canvasSize.width ;
    bg.height = parameters.canvasSize.height;
    bg.filters = [parameters.filter];
    filter = parameters.filter;
    app.stage.addChild(bg);
};


export {CONTAINER};