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

    router.post('/:imgid', function(req, res) {
        var imgid = req.params.id;
        var tags = req.body.tags.join(";");
        var gps = req.body.gps;
        // imagesPersistent.updatetags(tags,gps,imgid,dbconnection, messaging.bind(res));
        imagesPersistent.update(imgid,tags,gps,dbconnection, messaging.bind(res));
    });

    return router
}
