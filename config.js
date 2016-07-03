const nconf = require('nconf');
const Joi = require('joi');
const pkg = require('./package.json');

nconf
    .argv()
    .env()
    .file('config.json');

nconf.defaults({
    SERVER_HOST_NAME: 'localhost',
    PORT: 8000,
    MONGO_URI: 'mongodb://localhost/dvd',
    LOG_LEVEL: 'info'
});

const config = {
    NAME: pkg.name,
    VERSION: pkg.version,
    SERVER_HOST_NAME: nconf.get('SERVER_HOST_NAME'),
    PORT: nconf.get('PORT'),
    //LOG_LEVEL: nconf.get('LOG_LEVEL'),
    MONGO_URI: nconf.get('MONGO_URI')
};

function validateConfig(obj) {
    const result = Joi.validate(obj, {
        NAME: Joi.string().required(),
        VERSION: Joi.string().required(),
        SERVER_HOST_NAME: Joi.string(),
        PORT: Joi.number().integer(),
        //LOG_LEVEL: Joi.string(),
        MONGO_URI: Joi.string()
    }, {
        abortEarly: false
    });

    if (result.error !== null) {
        console.log('invalid or missing config settings:');

        result.error.details(function (err) {
            console.log('-', err.message, '--> please set', err.path);
        });
    }
}

validateConfig(config);

module.exports = config;