const bunyan = require('bunyan');
const config = require('./config');

module.exports = {
    default: bunyan.createLogger({name: 'dvd-verwaltung', level: config.LOG_LEVEL}),
    http: bunyan.createLogger({name: 'dvd-verwaltung-http', level: 'info'})
};
