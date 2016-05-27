﻿'use strict';module.exports = function (routes) {    var Table = require('cli-table');    var table = new Table({head: ["", "Name", "Path"]});    console.log('\nAPI for this service \n');    console.log('\n********************************************');    console.log('\tDVD Verwaltung');    console.log('********************************************\n');    routes.forEach(function(middleware){        var val;        if(middleware.route){            val = middleware.route;            var _o = {};            _o[val.stack[0].method] = [val.path, val.path];            table.push(_o);        } else if(middleware.name === 'router'){ // router middleware            //get prefix from Router            var prefix = middleware.regexp.toString();            prefix = prefix.replace(/[^a-zA-Z]/g, '');            prefix = '/' + prefix.substr(0, prefix.length-1);            middleware.handle.stack.forEach(function(handler){                val = handler.route;                //console.log(val);                handler.route.stack.forEach(function(stack) {                    if (stack.name !== 'authenticate') {                        //console.log(stack);                        var _o = {};                        _o[stack.method] = [prefix + val.path, prefix + val.path];                        table.push(_o);                    }                });            });        }    });    console.log(table.toString());    return table;};