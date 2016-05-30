'use strict';

var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var filmSchema = new Schema({
    title: {type: String, required: true, unique: true},
    category: {type: String, ref: 'category', required: true},
    number: {type: Number, required: true},
    img: {data: Buffer, contentType: String}
}, {
    versionKey: false,
    toJSON: {
        transform: function (doc, ret) {
            ret.id = ret._id;
            delete ret._id;
        }
    }
});

module.exports = mongoose.model('film', filmSchema);