﻿'use strict';var express = require('express');var passport = require('passport');var bodyParser = require('body-parser');var app = express();app.use(express.static('public'));app.use(passport.initialize());app.use(bodyParser.json());app.use(bodyParser.urlencoded({ extended: true }));var port = process.env.PORT || 8000;app.listen(port, function () {    //require('./document')(app.router.mounts);});require('./routes')(app);module.exports.app = app;