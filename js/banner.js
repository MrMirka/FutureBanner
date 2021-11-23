class BANNER {
    constructor(status, data, animSpeed, isShow){
        this.status = status;
        this.data = data;
        this.animSpeed = anim.speed;
        this.isShow = isShow;

        this.effects;
        this.errors;
    };

    //Добавляет объекты из data в область canvas. Отрисовывает баннер
    draw(){};


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