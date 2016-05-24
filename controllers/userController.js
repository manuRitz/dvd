'use strict';

/**
 * Controller for user
 * @returns {UserController} return userController
 */
function UserController() {
    var User = require('../models/user');

    /**
     * create new user
     * @param {request} req request
     * @param {response} res response
     * @returns {void}
     */
    this.postUser = function (req, res) {
        console.log(req.body);
        var user = new User({
            username: req.body.username,
            password: req.body.password
        });

        user.save(function (err) {
            if (err) {
                res.json(err);
            } else {
                res.json({message: 'user saved'});
            }
        });

    };

    /**
     * return all users
     * @param {request} req request
     * @param {response} res response
     * @returns {void}
     */
    this.getUser = function (req, res) {
        User.find(function (err, users) {
            if (err)
                res.send(err);

            res.json(users);
        });

    };
    return this;
}

module.exports = new UserController();