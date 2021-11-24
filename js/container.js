let app, params;

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
    }

    /*Создание экземпляра класса Banner с командой на отрисовку.
    Конструктор принимает объект data из JSON и управляющие триггеры
    отвечающие за мгновенную или отложенную отрисовку баннера.*/
    addBanner(){};


    //Удаляет экземпляр класса из очереди на отображение.
    removeBanner(){};


    //Возвращает активный баннер, позицию в очереди, а так же его тип.
    getInfo(){};


    //Изменяет позицию баннера в очереди.
    shiftPosition(){};


    //Сменить банер на предыдущий в очереди.
    toLeft(){};


    //Сменить банер напоследующий в очереди.
    toRight(){};


    //Возвращает размер canvas.
    getCanvasSize(){
        return params.canvasSize;
    };

     //Возвращает размер canvas.
     getScreenSize(){
        return params.screenSize;
    };


    //Возвращает массив объектов bannerData. (путь к данным баннера на диске, тип баннера).
    getJSON(){};


    //Управление подписями к баннерам за пределами блока canvas.
    setCuption(){};


    //Запуск эффекта при смене баннера.
    startTransition(){};


    //Запускается при изменении размера окна, с последующей перерисовкой баннера.
    update(){};


    //Отрисовка элементов управления
    initUi(){};
}

export {CONTAINER};