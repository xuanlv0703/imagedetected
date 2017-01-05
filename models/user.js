var mysql = require('mysql');

exports.signup = function(id, staffid, username, password, fullname, email, status, datecreated, connetion, done) {
    var query = "INSERT INTO user(id,staffid,username,password,fullname,name,email,status,datecreated) VALUE(?,?,?,?,?,?,?,?,?)";
    var table = [id, staffid, username, password, fullname, fullname, email, status, datecreated];
    query = mysql.format(query, table);
    connetion.query(query, done);
}

exports.login = function(user, connection, done) {
    var query = "select * from a003_users where username = ? and password = ?";
    var table = [user.name, user.password];
    query = mysql.format(query, table);
    connection.query(query, done);
};

