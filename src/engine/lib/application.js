import request from '../xhr/index';


export default class application {

    constructor(config) {

        this._config = config;
        this._controllers = [];
        this._modules = [];
    }

    controllers(array) {
        for (let i in array) {
            this._controllers[array[i].name] = array[i];
        }
    }

    modules(array) {
        for (let i in array) {
            this._modules[array[i].name] = array[i];
        }
    }

    boot() {

        (new request).create(this._config.templateRoot + this._config.template).then(function (o) {
            console.log(o);
        });


    }

}