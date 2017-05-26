//import {request} from 'request';
//import {response} from 'response';

 var helpers = function () { 

    // convert string to slug
    String.prototype.slug = function () {
        return this.toLowerCase()
            .replace(/[^\w ]+/g, '')
            .replace(/ +/g, '-');
    }


    // convert object to html attributes
    this.toAttributes = function ( i, prefix ) {
        var attributes = [];
        Object.keys(i).map( function (k) {
            var k = (typeof prefix == 'string') ? prefix + k : k;
            attributes.push(prefix + '=' + i[k]);
        });

        return attributes.join(' ');
    }

    // serialize object to query string
    this.serializeToQS = function(data, prefix) {
      var str = [];

      for(var o in data) {
        if (data.hasOwnProperty(o)) {

          var k = prefix ? prefix + "[" + o + "]" : o, v = data[o];
          str.push(typeof v == "object" ?
           this.serializeToQS(v, k) :
            encodeURIComponent(k) + "=" + encodeURIComponent(v));

        }
      }
           
      return str.join("&");
    }

    
    return this;
       
};

var $helpers = new helpers();

export default class request {

    constructor() {
        this.url;
        this.method =  'get';
        this.headers = {'Content-type': 'application/x-www-form-urlencoded', 'Accept': 'application/json'};
        this.xhr = null;
    }

    create(src, config) {     

        config = config || {};

        let type,data;   

        this.url = src || this.url;
        this.data = data = config.data || '';
        this.method = type = config.method || this.method;

         if (['get', 'post', 'put', 'delete', 'options', 'head', 'patch'].indexOf(type.toLowerCase()) < 0) {
            throw new Error('Invalid request method ' + type);
        }


        switch (type) {

            case 'get': 

                if (typeof data == 'object') {
                    data = $helpers.serializeToQS(data);
                } else if (typeof data != 'string') {
                    throw new Error('Invalid data passed in get request.');
                }

            break;

            case 'post': 

                if (typeof data == 'object' && !(data instanceof FormData)) {
                    data = $helpers.serializeToQS(data);
                } else if (data instanceof FormData) {
                    delete headers['Content-Type'];
                }

            break;


        }                   


        if(typeof XMLHttpRequest !== 'undefined') {
            this.xhr = new XMLHttpRequest();
        } else {
            var versions = ["MSXML2.XmlHttp.5.0", 
                            "MSXML2.XmlHttp.4.0",
                            "MSXML2.XmlHttp.3.0", 
                            "MSXML2.XmlHttp.2.0",
                            "Microsoft.XmlHttp"]
 
             for(var i = 0, len = versions.length; i < len; i++) {
                try {
                    this.xhr = new ActiveXObject(versions[i]);
                    break;
                }
                catch(e){
                    console.log('XML Request not supported.');
                    console.error(e);
                }
             } // end for
        }

        this.data = data;

        return this.exec();


    }

    exec() {

        let instance = this;

        return new Promise((resolve, reject) => {


        instance.xhr.onreadystatechange = function () {
            if(instance.xhr.readyState < 4) {
                return;
            }
            
            // some error occurred 
            if(instance.xhr.status !== 200) {
                return reject(instance.xhr.status, instance.xhr);              
            }
 
            // all is well  
            if(instance.xhr.readyState === 4 && instance.xhr.status === 200) {
               
                return resolve(instance.xhr.response, instance.xhr);
            }           
        }


         
             if (instance.method == 'get') {
                instance.url += '?' + instance.data;
             }

            instance.xhr.open(instance.method, instance.url, true);

            // set headers            
            Object.keys(instance.headers).map(function(key) {
                instance.xhr.setRequestHeader(key, instance.headers[key]);
            });
                    
        
            if (instance.method == 'get') {
                instance.xhr.send();
            } else {
                instance.xhr.send(data);
            }

        }); 
    }


}