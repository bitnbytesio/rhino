export default class create {


	construct() {

        this.xhr = false;

		if (typeof XMLHttpRequest !== 'undefined') {
            this.xhr = new XMLHttpRequest();
        } else {
            var versions = ["MSXML2.XmlHttp.5.0",
                "MSXML2.XmlHttp.4.0",
                "MSXML2.XmlHttp.3.0",
                "MSXML2.XmlHttp.2.0",
                "Microsoft.XmlHttp"]

            for (var i = 0, len = versions.length; i < len; i++) {
                try {
                    this.xhr = new ActiveXObject(versions[i]);
                    break;
                }
                catch (e) {
                    console.log('XML Request not supported.');
                    console.error(e);
                }
            } // end for
        }

         console.log(this.xhr);

	}

    onReady(func) {

        console.log(this.xhr);

       func(this.xhr);

    }

    open(type, src, b) {
        return this.xhr.open(type, src, b);
    }

    setRequestHeader(key, value) {
        return this.setRequestHeader(key, value);
    }

    send() {
        return this.xhr.send(arguments[0] || null);
    }

    instance() {
        return this.xhr;
    }

}