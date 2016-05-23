'use strict';

var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var categorySchema = new Schema({
    category: {type: String, required: true, unique: true},
    shortcut: {type: String, required: true, unique: true}
}, {
    versionKey: false,
    toJSON: {
        transform: function (doc, ret) {
            ret.id = ret._id;
            delete ret._id;
        }
    }
});

module.exports = mongoose.model('category', categorySchema);