var router = require('express').Router();
var imagesPersistent = require('../models/images.js');
var messaging = require('../uses').messaging;
var multipart = require('connect-multiparty');
var multipartMiddleware = multipart({ uploadDir: './source/uploads' });
var async = require('async');
var request = require('request');
var config = require('../config');

module.exports = uploadAPI;

function uploadAPI(app) {
    var dbconnection = app.get('dbpool');
    router.post('/', multipartMiddleware, function(req, res) {
  
        var files = req.files.file_data
        if (!Array.isArray(files)) files = [files]
        files.map(function(img) {
            img.uid = req.body.id;
            img.aid = req.body.aid;
        })
  
        async.waterfall([
            insertFileData,
            selectFromPaths,
            automatedTagging
        ], messaging.bind(res));

        function insertFileData(callback) {
            imagesPersistent.save(files, dbconnection, function(err,data){
                callback(err)
            });
        }

        function selectFromPaths(callback) {
            var paths = files.map(function(img) { return img.path })
            imagesPersistent.frompaths(paths, dbconnection, function (err, data) {
                callback(err, data)
            })        
        }

        function automatedTagging(files, callback) {
            var automated = files.map(function (data) {
                return detectTags.bind(detectTags, data)
            }) 
            async.parallel(automated, function (error, results) {
                callback(error, results)
            })
        }

        function detectTags(file, callback) {
            request.post({
                url: 'http://'+config.host+':'+config.port+'/api/detect', 
                form: { filePath: file.path },
            }, 
                function (error, response, body) {

                    body = JSON.parse(body);
                    file.title = body.title;
                    file.tags = body.tags;
                    file.alltags = body.alltags;
                    file.lat = body.gps.lat;
                    file.lon = body.gps.lon;
                    file.city = body.gps.cities;
                    file.colors = body.colors.accentColor;
                        imagesPersistent.update({
                            tags: body.tags,
                            title: body.title,
                            alltags: body.alltags,
                            lat: body.gps.lat,
                            lon: body.gps.lon,
                            city: body.gps.cities,
                            id: file.id,
                            colors: body.colors.accentColor
                        },dbconnection, function (err, data) {
                            console.log(err)
                        })
                    callback(error,file)
                })
        }
    });

    return router
}
