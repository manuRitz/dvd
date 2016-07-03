﻿'use strict';const config = require('./config');const errors = require('./backend/errors');const bodyParser = require('body-parser');const path = require('path');const Promise = require('bluebird');const express = require('express');//var session = require('express-session');//var passport = require('passport');//var LocalStrategy = require('passport-local').Strategy;var Application = require('./backend//Application');var app = new Application();var server = express();server.use(express.static('public'));server.use(bodyParser.json());server.use(bodyParser.urlencoded({extended: true}));//server.use(session({ secret: 'keyboard cat' }));//server.use(passport.initialize());//server.use(passport.session());server.use(express.static(path.join(__dirname, 'public')));//server.use(function(req, res, next) {//    if (req.user) {//        res.cookie('user', JSON.stringify(req.user));//    }//    next();//});//passport.use('local', new LocalStrategy({ usernameField: 'username', passwordField: 'password', passReqToCallback : true }, function(username, password, done) {//    console.log(password);//    User.findOne({ username: username }, function(err, user) {//        console.log(err);//        if (err) return done(err);//        if (!user) return done(null, false, { message: 'Incorrect username.' });//        if (!user.verifyPassword(password)) {//            return done(null, false, { message: 'Incorrect password.' });//        }//        user.comparePassword(password, function(err, isMatch) {//            if (err) return done(err);//            if (isMatch) return done(null, user);//            return done(null, false);//        });//    });//}));//passport.serializeUser(function(user, done) {//    done(null, user.id);//});////passport.deserializeUser(function(id, done) {//    User.findById(id, function(err, user) {//        done(err, user);//    });//});server.listen(config.PORT, function () {    //require('./document')(server._router.stack);});function errorHandling(err) {    var ValidationErrors = {        REQUIRED: 'required',        NOTLETTER: 'user defined'    };    var errMessage = {        error: 'VALIDATION_ERROR',        validation: {}    };    if (err.message === 'DUPLICATED') {        errMessage.validation = 'DUPLICATED';    }    if (err.message === 'VALIDATION_ERROR' && err.statusCode === 400) {        for (var errName in err.err.errors) {            switch (err.err.errors[errName].kind) {                case ValidationErrors.REQUIRED:                    errMessage.validation[errName] = 'MISSING';                    break;                case ValidationErrors.NOTLETTER:                    errMessage.validation[errName] = 'INVALID';                    break;            }        }    }    if (err.message === 'NOT_FOUND' && err.statusCode == 404) {        errMessage = {            error: 'NOT_FOUND'        }    }    return errMessage;}function respond(getResult) {    return function(req, res, next) {        Promise            .try(function () {                return getResult(req);            })            .then(function (result) {                res.send(result);            })            .catch(function (err) {                if (err) {                    res.status(err.statusCode).send(errorHandling(err));                }            });    };}var category = express.Router();category.route('')    .get(respond(function (req) {        return app.getCategories(req.query);    }))    .post(respond(function (req) {        return app.createCategory(req.body);    }));category.route('/:id')    .get(respond(function (req) {        return app.getCategoryById(req.params.id, req.body);    }))    .put(respond(function (req) {        return app.updateCategory(req.params.id, req.body);    }))    .delete(respond(function (req) {        return app.deleteCategory(req.params.id, req.body);    }));server.use('/api/category', category);//var film = express.Router();//film.route('')//    .get(filmController.getFilms)//    .post(filmController.postFilm);////film.route('/:id')//    .get(filmController.getFilmById)//    .put(filmController.putFilm)//    .delete(filmController.deleteFilm);//server.use('/api/film', film);server.get('*', function(req, res) {    res.redirect('/#' + req.originalUrl);});module.exports.app = server;//function ensureAuthenticated(req, res, next) {//    if (req.isAuthenticated()) next();//    else res.send(401);//}