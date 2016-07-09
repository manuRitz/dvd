'use strict';

var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var categorySchema = new Schema({
    category: {type: String, required: true, unique: true},
    shortcut: {type: String, required: true, uppercase: true, unique: true}
}, {
    versionKey: false,
    toJSON: {
        transform: function (doc, ret) {
            ret.id = ret._id;
            delete ret._id;
        }
    }
});

categorySchema.path('shortcut').validate(function (shortcut) {
    return !shortcut.match(/[^a-zA-Z]/i) && shortcut.length <= 2;
}, 'letter with length 2 or lower');

module.exports = function (mongoose) {
    return mongoose.model('Category', categorySchema);
};