import { smoke } from "../data/effects/smoke.js";
import { caustic } from "../data/effects/caustic.js";
let effect, params, value;
class EFFECT {
    constructor(name, data){
        effect = name;
        params = data;
    }

    //Загрузка данных их внешнего модуля и сохранение значений шейдера и переменных.
    getShader(){
        switch(effect){
            case 'smoke':
                value = smoke(params);
                return new PIXI.Filter(undefined, value.f, value.u);

            case 'caustic':
                value = caustic(params);
                return new PIXI.Filter(undefined, value.f, value.u);    
        };
    };
}
export {EFFECT};