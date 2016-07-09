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

    getCategories(query) {
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
}

module.exports = Application;
