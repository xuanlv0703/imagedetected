var router = require('express').Router();
var imagesPersistent = require('../models/images.js');
var messaging = require('../uses').messaging;
var multipart = require('connect-multiparty');
var multipartMiddleware = multipart({ uploadDir: './source/uploads' });
var async = require('async');


module.exports = uploadAPI;

function uploadAPI(app) {
    var dbconnection = app.get('dbpool');
    router.post('/', multipartMiddleware, function(req, res) {
        console.log(req.files)
        console.log('===========')
        console.log(req.body)
        // var path = req.files.file_data.path;
        // var uid = req.body.id;
        // var aid = req.body.aid;
        // if(aid === undefined){
        // 	aid = 1;
        // }
        // console.log(path);
        // var imgObj = {path:path,uid:uid,tags:'',aid:aid};
        var files = req.files.file_data
        if (!Array.isArray(files)) files = [files]
        files.map(function(img) {
            img.uid = req.body.id;
            img.aid = req.body.aid;
        })
        // imagesPersistent.save(files, dbconnection, messaging.bind(res));
         // imagesPersistent.save(files, dbconnection, function(err,data){
         // 	// imgObj.id = data.insertId;
         //    console.log(data)
         // 	res.json({});
         // });

        async.waterfall([
            insertFileData,
            selectFromPaths
        ], messaging.bind(res));

        function insertFileData(callback) {
            imagesPersistent.save(files, dbconnection, function(err,data){
             // imgObj.id = data.insertId;
                console.log('inserted result:', data)
                callback(err)
            });
        }

        function selectFromPaths(callback) {
            var paths = files.map(function(img) { return img.path })
            imagesPersistent.frompaths(paths, dbconnection, function (err, data) {
                console.log('selected data:', data)
                callback(err, data)
            })        
        }
    });

    return router
}
