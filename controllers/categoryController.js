'use strict';

/**
 * controller for the category model
 * @returns {CategoryController} return categoryController
 */
function CategoryController() {
    var Category = require('../models/category');

    var mongoose = require('../db').mongoose;

    /**
     * get all categories
     * @param {request} req request
     * @param {response} res response
     * @returns {void}
     */
    this.getCategories = function (req, res) {
        mongoose.model('category').find(function (err, category) {
            res.send(category);
        })
    };

    /**
     * get category by id
     * @param {request} req request
     * @param {response} res response
     * @returns {void}
     */
    this.getCategoryById = function (req, res) {
        mongoose.model('category').findOne({'_id': req.params.id}, function (err, category) {
            if (category === null || err) {
                res.status(400).send({'error': 'UNKNOWN_OBJECT'});
            } else {
                res.send(category);
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
    this.postCategory = function (req, res) {
        var newCategory = new Category(req.query);



        newCategory.save(function (err, category) {
            //console.log(err.toString());
            if (err) {
                res.status(400).send(errorHandling(err));
            } else {
                res.send(category);
            }
        });
    };


    /**
     * update a category by id and validate params
     * @param {request} req request
     * @param {response} res response
     * @returns {void}
     */
    this.putCategory = function (req, res) {
        mongoose.model('category').findOneAndUpdate({'_id': req.params.id}, {$set: req.query}, {runValidators: true}, function (err, category) {
            if (category === null || err) {
                if (category === null || err.name === 'CastError') {
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
     * delete a category by id
     * @param {request} req request
     * @param {response} res response
     * @returns {void}
     */
    this.deleteCategory = function (req, res) {
        mongoose.model('category').findOne({'_id': req.params.id}, function (err, category) {
            if (category === null || err) {
                res.status(400).send({'error': 'UNKNOWN_OBJECT'});
            } else {
                category.remove();
                res.send({success: true});
            }
        })
    };
    return this;
}

module.exports = new CategoryController();