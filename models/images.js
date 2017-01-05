var mysql = require('mysql');

exports.save = function(imgObj,connection, done) {
    var query = "INSERT INTO a003_images(path,uid,tags,created) VALUE(?,?,?,now())";
    var table = [imgObj.path,imgObj.uid,imgObj.tags];
    query = mysql.format(query, table);
    connection.query(query, done);
}

