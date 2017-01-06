var mysql = require('mysql');

exports.save = function(imgObj,connection, done) {
    var query = "INSERT INTO a003_images(path,uid,tags,created) VALUE(?,?,?,now())";
    var table = [imgObj.path,imgObj.uid,imgObj.tags];
    query = mysql.format(query, table);
    connection.query(query, done);
}

exports.getall = function(uid,connection, done) {
    var query = "SELECT img.*,alb.title as album FROM a003_images img LEFT JOIN a003_album alb ON img.aid = alb.id WHERE img.uid = ?";
    var table = [uid];
    query = mysql.format(query, table);
    connection.query(query, done);
};

