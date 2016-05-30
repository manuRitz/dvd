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
        if (req.body.alphabet) {
            mongoose.model('category').find({
                category: new RegExp('^' + '[' + req.body.alphabet + ']', 'i')
            }, function (err, category) {
                res.send(category);
            })
        } else {
            mongoose.model('category').find(function (err, category) {
                res.send(category);
            })
        }


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
            NOTLETTER: 'user defined'
        };

        var errMessage = {
            error: 'VALIDATION_ERROR',
            validation: {}
        };

        if (err.name === 'MongoError') {
            errMessage.validation = 'DUPLICATED';
        }


        if (err.name === 'ValidationError') {
            //console.log(err);
            for (var errName in err.errors) {
                switch (err.errors[errName].kind) {
                    case ValidationErrors.REQUIRED:
                        errMessage.validation[errName] = 'MISSING';
                        break;
                    case ValidationErrors.NOTLETTER:
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
        var newCategory = new Category(req.body);
        newCategory.save(function (err, category) {
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
        mongoose.model('category').findOneAndUpdate({'_id': req.params.id}, {$set: req.body}, {runValidators: true}, function (err, category) {
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