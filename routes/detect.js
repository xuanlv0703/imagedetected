var router = require('express').Router();
var imagesPersistent = require('../models/images.js');
var messaging = require('../uses').messaging;
var _ = require('underscore');


module.exports = detectAPI;

function detectAPI(app) {
    var dbconnection = app.get('dbpool');
    router.post('/', function(req, res) {
        var filePath = req.body.filePath;
        formData = fs.readFileSync(filePath);
        totalResult(filePath,res, formData)
    });

    return router
}


//begin 
var unirest = require("unirest");
    var request = require('request'),
        // apiKey = 'acc_94129a9e6f11e84 ',
        // apiSecret = '9291162050501da0ff1640e3ca01637b';
        apiKey = 'acc_48307d78b5ec2b1';
        apiSecret = 'bba14f76489939f1f7ceed8ef61efb7b';

var async = require('async');
//upload image to cloud server
var fs = require('fs');
function createFormData(filePath,callback) {
        formData = {
            image: fs.createReadStream(filePath)
        };
    callback(null, formData)
}

function postImage(arg1, callback) {

    request.post({ url: 'https://api.imagga.com/v1/content', formData: arg1, headers: {
    'content-type': 'application/x-www-form-urlencoded'
  } },
        function(error, response, body) {
            var data = JSON.parse(body)
            var id = data.uploaded[0].id;
            callback(null, id);
        }).auth(apiKey, apiSecret, true);
}

function getContent(arg1, callback) {
    request.get('https://api.imagga.com/v1/tagging?content=' + arg1, function(error, response, body) {
        var data = JSON.parse(body)
        callback(null, data.results[0].tags);
    }).auth(apiKey, apiSecret, true);
}

function myProcess(arg1, callback) {
    callback(null, arg1);
}

//microsoft api
function detectMicrosoft(callback, imgdata) {
    var req = unirest("POST", "https://api.projectoxford.ai/vision/v1.0/analyze");
    req.query({
        "visualFeatures": 'tags',
        "language": "en"
    });

    req.headers({
        "Ocp-Apim-Subscription-Key": "aff897d767554595aa12e81fe533d08f",
        "Content-Type": "application/json"
    });

    req.multipart([{
        'content-type': 'application/json',
        body: imgdata
    }]);

    req.end(function(res) {
    	console.log(res.error)
        // if (res.error) throw new Error(res.error);
        callback(null, res.body.tags);
    });

}

function totalResult(filePath,res, imgdata) {
    async.parallel({
        one: function(callback) {
            async.waterfall([
            	async.constant(filePath),
                createFormData,
                postImage,
                getContent,
                myProcess
            ], function(err, result) {
                callback(null, result);
            });
        },
        two: function(callback) {
            detectMicrosoft(callback, imgdata)
        }
    }, function(err, results) {
        var data = joinTags(results.one,results.two);
        console.log(results.one)
        console.log('===========================>>')
        console.log(results.two)
        try{
             var parser = require('exif-parser').create(imgdata);
            var result = parser.parse();
            var lat = result.tags.GPSLatitude;
            var lon = result.tags.GPSLongitude;
        }catch(err){
            console.log(err)
        }
       
        
        if(lat===undefined){
            lat = null;
        }
        if(lon === undefined){
            lon = null;
        }
        var gpsObj = {lat:lat,lon:lon};
        res.json({data:data,gps:gpsObj});
    });
}

function joinTags(a,b){
    var result = [];

_.each(a, function(ea) {
    var entry = _.find(b, function(eb) {return ea.tag == eb.name;});
    if (entry) result.push(entry.tag || entry.name);
});
return result;
}