var router = require('express').Router();
var userPersistent = require('../models/user.js');
var messaging = require('../uses').messaging;
var uuid = require('node-uuid');
var async = require('async');
module.exports = userAPI;

function userAPI(app) {
    var dbconnection = app.get('dbpool');

	router.put('/login', function(req, res) {
        var user = req.body;

        userPersistent.login(user, dbconnection, function(err, data) {
            var message = messaging(err, data);
            if (!err) {
                message.token = app.get('jwt').sign(user, app.get('secret'), { expiresIn: 24 * 3600 })
            }
            res.jsonp(message)
        })
    });

    router.get('/getAllUser', function(req, res) {
        userPersistent.getAllUser(dbconnection, messaging.bind(res));
    });

    router.post('/register',function(req,res){
        var objUser = req.body;
        async.parallel({
        one: function(callback) {
            //check username
             userPersistent.checkExistUser(objUser,dbconnection,function(err,data){
                var message = "";
                if(data.length >0){
                    message = "Username is exist";
                }
                callback(err,message)
             })
        },
        two: function(callback) {
            //check email
            userPersistent.checkExistEmail(objUser,dbconnection,function(err,data){
                var message = "";
                if(data.length >0){
                    message = "Email is exist";
                }
                callback(err,message);
             })
        }
    }, function(err, results) {
        //if no err create user
        if(results.one == '' && results.two == ''){
            userPersistent.signup(objUser,dbconnection,function(err,data){
                objUser.id= data.insertId;
                var message = messaging(err, objUser);
                if (!err) {
                    message.token = app.get('jwt').sign(objUser, app.get('secret'), { expiresIn: 24 * 3600 })
                }
                res.jsonp(message)
         })
        }else{
            res.jsonp({error:true,message:{username:results.one,email:results.two}})
        }
        

    });

    });

    return router
}