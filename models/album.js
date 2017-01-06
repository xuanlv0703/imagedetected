var mysql = require('mysql');

exports.getall = function(uid,connection, done) {
    var query = "SELECT alb.* FROM a003_album alb WHERE uid = ?";
    var table = [uid];
    query = mysql.format(query, table);
    connection.query(query, done);
};

