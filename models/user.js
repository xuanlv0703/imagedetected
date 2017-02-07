var mysql = require('mysql');

exports.signup = function(objUser, connection, done) {
    var query = "INSERT INTO a003_users(username,email,password,firstname,lastname,isactive) VALUE(?,?,?,?,?,?)";
    var table = [objUser.username,objUser.email,objUser.password,objUser.firstname,objUser.lastname,1];
    query = mysql.format(query, table);
    connection.query(query, done);
}

exports.checkExistUser = function(objUser,connection,done){
	var query = "select * from a003_users where username = ?"
	var table = [objUser.username];
	query = mysql.format(query, table);
    connection.query(query, done);
}

exports.checkExistEmail = function(objUser,connection,done){
	var query = "select * from a003_users where email = ?"
	var table = [objUser.email];
	query = mysql.format(query, table);
    connection.query(query, done);
}

exports.login = function(user, connection, done) {
    var query = "select * from a003_users where username = ? and password = ?";
    var table = [user.name, user.password];
    query = mysql.format(query, table);
    connection.query(query, done);
};

