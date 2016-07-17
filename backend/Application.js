const Promise = require('bluebird');

const config = require('../config');
const Database = require('./dao/Database');

class Application {

    constructor(config) {
        this.config = config;

        this.db = new Database(config);
    }

    getInfo() {
        return Promise.resolve({
            name: config.NAME,
            version: config.VERSION
        });
    }

    findCategories(query) {
        return this.db.findCategory(query);
    }

    getCategoryById(id) {
        return this.db.getCategory(id);
    }

    createCategory(body) {
        return this.db.createCategory(body);
    }

    updateCategory(id, body) {
        return this.db.updateCategory(id, body);
    }

    deleteCategory(id) {
        return this.db.deleteCategory(id);
    }

    getCategoryCount(category_id) {
        return this.db.getCategoryCount(category_id);
    }

    findFilm(query) {
        return this.db.findFilm(query);
    }

    getFilmById(id) {
        return this.db.getFilm(id);
    }

    createFilm(body) {
        return this.db.createFilm(body);
    }

    updateFilm(id, body) {
        return this.db.updateFilm(id, body);
    }

    deleteFilm(id) {
        return this.db.deleteFilm(id);
    }

}

module.exports = Application;
