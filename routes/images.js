var router = require('express').Router();
var imagesPersistent = require('../models/images.js');
var messaging = require('../uses').messaging;
var async = require('async'), fs = require('fs')

module.exports = imagesAPI;

function imagesAPI(app) {
    var dbconnection = app.get('dbpool');
    router.get('/:uid', function(req, res) {
        var uid = req.params.uid;
        imagesPersistent.getall(uid,dbconnection, messaging.bind(res));
    });

    router.post('/:imgid', function(req, res) {
        var imgid = req.params.id;
        var imgObj = req.body;
        imagesPersistent.update(imgObj,dbconnection, messaging.bind(res));
    });

    router.delete('/:imgid', function(req, res) {
        var imgid = req.params.imgid;
        // imagesPersistent.remove(imgid, dbconnection, messaging.bind(res));
        async.waterfall([deleteImage, deleteRecord], messaging.bind(res))

        function deleteImage(callback) {
            imagesPersistent.get(imgid, dbconnection, function (err, data) {
                var img_path = (data[0] || {}).path || ''
                if (!err && img_path) fs.unlink(img_path)
                callback(err)
            })
        }

        function deleteRecord(callback) {
            imagesPersistent.remove(imgid, dbconnection, function (err, data) {
                var ok = !err || (data.affectedRows == 1)
                callback(ok ? null : new Error('Can\'t delete this image'))
            })
        }
    });

    return router
}
