'use strict';

/**
 * controller for the film model
 * @returns {FilmController} return filmController
 */
function FilmController() {
    var Film = require('../models/film');

    var mongoose = require('../db').mongoose;

    /**
     * get all films
     * @param {request} req request
     * @param {response} res response
     * @returns {void}
     */
    this.getFilms = function (req, res) {
        mongoose.model('film').find(function (err, film) {
            res.send(film);
        })
    };

    /**
     * get film by id
     * @param {request} req request
     * @param {response} res response
     * @returns {void}
     */
    this.getFilmById = function (req, res) {
        mongoose.model('film').findOne({'_id': req.params.id}, function (err, film) {
            if (film === null || err) {
                res.status(400).send({'error': 'UNKNOWN_OBJECT'});
            } else {
                res.send(film);
            }
        });
    };

    /**
     * handle validation errors and return error response
     * @param {errors} err error
     * @returns {{error: string, validation: {}}} return error response
     */
    function errorHandling(err) {
        var ValidationErrors = {
            REQUIRED: 'required',
            NOTNUMBER: 'user defined',
            ENUMNOTVALID: 'enum'
        };

        var errMessage = {
            error: 'VALIDATION_ERROR',
            validation: {}
        };

        if (err.name === 'MongoError') {
            //console.log(err.toJSON());
            errMessage.validation = 'DUPLICATED';
        }


        if (err.name === 'ValidationError') {
            //console.log(err);
            for (var errName in err.errors) {
                switch (err.errors[errName].kind) {
                    case ValidationErrors.REQUIRED:
                        errMessage.validation[errName] = 'MISSING';
                        break;
                    case ValidationErrors.ENUMNOTVALID:
                        errMessage.validation[errName] = 'INVALID';
                        break;
                    case ValidationErrors.NOTNUMBER:
                        errMessage.validation[errName] = 'INVALID';
                        break;
                }
            }
        }

        return errMessage;
    }


    /**
     * post a category and validate params
     * @param {request} req request
     * @param {response} res response
     * @returns {void}
     */
    this.postFilm = function (req, res) {
        var newFilm = new Film(req.body);
        newFilm.save(function (err, film) {
            if (err) {
                res.status(400).send(errorHandling(err));
            } else {
                res.send(film);
            }
        });
    };


    /**
     * update a film by id and validate params
     * @param {request} req request
     * @param {response} res response
     * @returns {void}
     */
    this.putFilm = function (req, res) {
        mongoose.model('film').findOneAndUpdate({'_id': req.params.id}, {$set: req.body}, {runValidators: true}, function (err, film) {
            if (film === null || err) {
                if (film === null || err.name === 'CastError') {
                    res.status(400).send({'error': 'UNKNOWN_OBJECT'});
                } else {
                    res.status(400).send(errorHandling(err));
                }
            } else {
                Category.findOne({'_id': req.params.id}, function (err, data) {
                    res.send(data);
                });
            }
        })
    };


    /**
     * delete a film by id
     * @param {request} req request
     * @param {response} res response
     * @returns {void}
     */
    this.deleteFilm = function (req, res) {
        mongoose.model('film').findOne({'_id': req.params.id}, function (err, film) {
            if (film === null || err) {
                res.status(400).send({'error': 'UNKNOWN_OBJECT'});
            } else {
                film.remove();
                res.send({success: true});
            }
        })
    };
    return this;
}

module.exports = new FilmController();