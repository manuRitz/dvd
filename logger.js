const bunyan = require('bunyan');
const config = require('./config');

module.export = {
    default: bunyan.createLogger({name: 'dvd-verwaltung', level: config.LOG_LEVEL})
};
