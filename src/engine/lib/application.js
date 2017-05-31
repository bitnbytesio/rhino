export default class application {

    constructor(config) {  

        this._config = config;      
        this._controllers = [];
        this._modules = [];
        this._providers = [];
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

    providers(array) {
        for (let i in array) {
            if (typeof array[i].deps == 'Array') {          
                this.providers(array[i].deps);
            }
            let factory = new array[i].using;
            this._providers[array[i].provides] = factory;
        }
    }

        
}