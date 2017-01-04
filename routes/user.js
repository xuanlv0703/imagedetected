var router = require('express').Router();
var userPersistent = require('../models/user.js');
var messaging = require('../uses').messaging;
var uuid = require('node-uuid');
module.exports = userAPI;

function userAPI(app) {
    var dbconnection = app.get('dbpool');

	router.put('/login', function(req, res) {
        var user = req.body;

        userPersistent.login(user, dbconnection, function(err, data) {
            var message = messaging(err, data);
            console.log(message);
            if (!err) {
                message.token = app.get('jwt').sign(user, app.get('secret'), { expiresIn: 24 * 3600 })
            }
            res.jsonp(message)
        })
    });

    router.get('/getAllUser', function(req, res) {
        userPersistent.getAllUser(dbconnection, messaging.bind(res));
    })

    return router
}