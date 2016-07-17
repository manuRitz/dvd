const restify = require('restify');
const Promise = require('bluebird');
const path = require('path');

const log = require('../logger').default;
const httpLog = require('../logger').http;
const Application = require('./Application');
const errors = require('./errors');

function createServer(name) {
    var server = this.server = restify.createServer({
        name: name,
        log: httpLog
    });

    server.pre(function (req, res, next) {
        req.headers['content-type'] = 'application/json';
        return next();
    });

    server.pre(restify.pre.sanitizePath());
    server.use(restify.CORS());
    server.use(restify.authorizationParser());
    server.use(restify.queryParser());
    server.use(restify.bodyParser({mapParams: false}));
    server.use(restify.fullResponse());
    server.use(restify.gzipResponse());

    return server;

}

//todo: new error handling
function errorHandling(err) {
    var ValidationErrors = {
        REQUIRED: 'required',
        NOTLETTER: 'user defined'
    };

    var errMessage = {
        error: 'VALIDATION_ERROR',
        validation: {}
    };
    if (err.message === 'DUPLICATED') {
        errMessage.validation = 'DUPLICATED';
    }

    if (err.message === 'VALIDATION_ERROR' && err.statusCode === 400) {
        for (var errName in err.err.errors) {
            switch (err.err.errors[errName].kind) {
                case ValidationErrors.REQUIRED:
                    errMessage.validation[errName] = 'MISSING';
                    break;
                case ValidationErrors.NOTLETTER:
                    errMessage.validation[errName] = 'INVALID';
                    break;
            }
        }
    }

    if (err.message === 'NOT_FOUND' && err.statusCode == 404) {
        errMessage = {
            error: 'NOT_FOUND'
        }
    }

    return errMessage;
}

function respond(fn) {
    return function (req, res, next) {
        return fn.call(this, req, res, next)
            .then(function (result) {
                log.trace({result: result}, 'request result');

                res.send(result);
                next();
            })
            .catch(errors.ApplicationError, function (e) {
                log.error({error: e}, 'request result');
                console.log(e);

                next(new restify.HttpError({statusCode: e.statusCode, body: {error: e.message, reason: e.data}}));
            })
            .catch(function (e) {
                log.error(e, 'request result');

                next(new restify.errors.InternalError(e));
            });
    };
}


class RestApi {

    constructor(config) {
        this.config = config;
        var server = this.server = createServer(config.NAME);
        var app = this.app = new Application(config);

        server.get('/api', respond(function () {
            return app.getInfo();
        }));

        server.get('/api/category', respond(function (req) {
            return app.findCategories(req.params);
        }));

        server.post('/api/category', respond(function (req) {
            return app.createCategory(req.body);
        }));

        server.get('/api/category/:id', respond(function (req) {
            return app.getCategoryById(req.params.id);
        }));

        server.put('/api/category/:id', respond(function (req) {
            return app.updateCategory(req.params.id, req.body);
        }));

        server.del('/api/category/:id', respond(function (req) {
            return app.deleteCategory(req.params.id);
        }));

        server.get('/api/category/count/:id', respond(function (req) {
            return app.getCategoryCount(req.params.id);
        }));

        server.get('/api/film', respond(function (req) {
            return app.findFilm(req.params);
        }));

        server.post('/api/film', respond(function (req) {
            return app.createFilm(req.body);
        }));

        server.get('/api/film/:id', respond(function (req) {
            return app.getFilmById(req.params.id);
        }));

        server.put('/api/film/:id', respond(function (req) {
            return app.updateFilm(req.params.id, req.body);
        }));

        server.del('/api/film/:id', respond(function (req) {
            return app.deleteFilm(req.params.id);
        }));

        var publicPath = path.resolve(__dirname, '..', 'public');

        server.get('/', restify.serveStatic({
            'directory': publicPath,
            'default': 'index.html'
        }));

        server.get(/\/\/?.*/, restify.serveStatic({
            directory: publicPath
        }));
    }

    start() {
        var server = this.server;
        var listen = Promise.promisify(server.listen, {context: server});

        return listen(this.config.PORT)
            .then(function () {
                log.info('REST API listen at %s', server.url);
            });
    }

    stop() {
        var server = this.server;
        var close = Promise.promisify(server.close, {context: server});
        return close();
    }
}

module.exports = RestApi;
