﻿'use strict';var express = require('express');var passport = require('passport');var bodyParser = require('body-parser');var logger = require('morgan');var cookieParser = require('cookie-parser');var path = require('path');var app = express();app.use(express.static('public'));app.use(passport.initialize());app.use(bodyParser.json());app.use(bodyParser.urlencoded({ extended: true }));app.use(logger('dev'));app.use(cookieParser());app.use(express.static(path.join(__dirname, 'public')));app.use(function(req, res, next) {    if (req.user) {        res.cookie('user', JSON.stringify(req.user));    }    next();});var port = process.env.PORT || 8000;app.listen(port, function () {    require('./document')(app._router.stack);});require('./routes')(app);module.exports.app = app;