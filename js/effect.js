class EFFECT {
    constructor(v_shader, f_shader, uniforms){
        this.v_shader = v_shader;
        this.f_shader = f_shader;
        this.uniforms = uniforms;
    }

    //Загрузка данных их внешнего модуля и сохранение значений шейдера и переменных.
    loadDate(){};


    //Отрисовка шейдера
    createShader(){};


    //Удаление шейдера
    deleteShader(){};
}
export {EFFECT};