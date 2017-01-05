var router = require('express').Router();
var userPersistent = require('../models/user.js');
var messaging = require('../uses').messaging;
var multipart = require('connect-multiparty');
var multipartMiddleware = multipart({ uploadDir: './source/uploads' });


module.exports = uploadAPI;

function uploadAPI(app) {
    var dbconnection = app.get('dbpool');

	// router.put('/login', function(req, res) {
 //        var user = req.body;

 //        userPersistent.login(user, dbconnection, function(err, data) {
 //            var message = messaging(err, data);
 //            console.log(message);
 //            if (!err) {
 //                message.token = app.get('jwt').sign(user, app.get('secret'), { expiresIn: 24 * 3600 })
 //            }
 //            res.jsonp(message)
 //        })
 //    });


	router.post('/', multipartMiddleware, function(req, resp) {
  	console.log(req.body, req.files);
  	// don't forget to delete all req.files when done 
  	resp.end('done');
	});


    return router
}






