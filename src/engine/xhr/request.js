import create from 'create';

export default class request {

    constructor() {

    }

    get(src,config) {
    	return this.make('GET', src, config);
    }

    post(src,data,config) {
    	config = config || {};
    	config.data = data;
    	return this.make('POST', src, config);
    }

    make(type,src,config) {

    	let req = new create();

        console.log(req);

    	return new Promise((resolve, reject) => {

    		req.onReady(function (xhr) {
                if (xhr.readyState < 4) {
                    return;
                }

                // some error occurred
                if (xhr.status !== 200) {
                    return reject(xhr.status, xhr);
                }

                // all is well
                if (xhr.readyState === 4 && xhr.status === 200) {
                    return resolve(xhr.response, xhr);
                }
            });


            if (type == 'get') {
                src += '?' + config.data;
            }

            req.open(type, src, true);

            // set headers
            Object.keys(config.headers).map(function (key) {
                req.setRequestHeader(key, config.headers[key]);
            });


            if (type == 'get') {
                req.send();
            } else {
                req.send(data);
            }

        });

	}

}

export {request};