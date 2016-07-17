var restify = require('restify');
var Promise = require('bluebird');

class RestClient {

    constructor(url, headers) {
        this.url = url;
        this.headers = headers || {};

        this.client = restify.createJsonClient({
            url: url,
            version: '*'
        });
    }

    setHeader(header, value) {
        this.headers[header] = value;
        return this;
    }


    get(path) {
        return this.performHttpCall('get', path);
    }


    post(path, obj) {
        return this.performHttpCall('post', path, obj);
    }


    put(path, obj) {
        return this.performHttpCall('put', path, obj);
    }


    del(path) {
        return this.performHttpCall('del', path);
    }


    performHttpCall(method, path, obj) {
        var options = {
            path: path,
            headers: this.headers
        };

        var client = this.client;

        return new Promise(function (resolve, reject) {{
            var params = [options];
            if (obj) {
                params.push(obj);
            }

            params.push(function (err, req, res, obj) {
                if (err) return reject(err);
                return resolve(obj);
            });

            client[method].apply(client, params);
        }});
    }
}

module.exports = RestClient;