var router = require('express').Router();
var imagesPersistent = require('../models/images.js');
var messaging = require('../uses').messaging;


module.exports = imagesAPI;

function imagesAPI(app) {
    var dbconnection = app.get('dbpool');
    router.get('/:uid', function(req, res) {
        var uid = req.params.uid;
        imagesPersistent.getall(uid,dbconnection, messaging.bind(res));
    });

    return router
}
