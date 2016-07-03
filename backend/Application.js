'use strict';

const Promise = require('bluebird');
//const Joi = require('joi');

const config = require('../config');
const db = require('./dao/database');

class Application {
    getInfo() {
        return Promise.resolve({
            name: config.NAME,
            version: config.VERSION
        });
    }

    getCategories(query) {
        return db.category.get(query);
    }

    getCategoryById(id) {
        return db.category.getById(id);
    }

    createCategory(body) {
        return db.category.create(body);
    }

    updateCategory(id, body) {
        return db.category.update(id, body);
    }

    deleteCategory (id) {
        return db.category.delete(id);
    }
}

module.exports = Application;

