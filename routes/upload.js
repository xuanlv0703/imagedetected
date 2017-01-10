var router = require('express').Router();
var imagesPersistent = require('../models/images.js');
var messaging = require('../uses').messaging;
var multipart = require('connect-multiparty');
var multipartMiddleware = multipart({ uploadDir: './source/uploads' });


module.exports = uploadAPI;

function uploadAPI(app) {
    var dbconnection = app.get('dbpool');
    router.post('/', multipartMiddleware, function(req, res) {
        var path = req.files.file_data.path;
        var uid = req.body.id;
        var aid = req.body.aid;
        if(aid === undefined){
        	aid = 1;
        }
        console.log(path);
        var imgObj = {path:path,uid:uid,tags:'',aid:aid};
         imagesPersistent.save(imgObj,dbconnection, function(err,data){
         	imgObj.imgid = data.insertId;
         	res.json(imgObj);
         });
    });

    return router
}
