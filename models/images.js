var mysql = require('mysql');

exports.save = function(imgObj,connection, done) {
    var query = "INSERT INTO a003_images(path,uid,tags,aid,created) VALUE(?,?,?,?,now())";
    var table = [imgObj.path,imgObj.uid,imgObj.tags,imgObj.aid];
    query = mysql.format(query, table);
    connection.query(query, done);
}

exports.getall = function(uid,connection, done) {
    var query = "SELECT img.*,alb.title as album FROM a003_images img LEFT JOIN a003_album alb ON img.aid = alb.id WHERE img.uid = ?";
    var table = [uid];
    query = mysql.format(query, table);
    connection.query(query, done);
};

exports.updatetags = function(tags,gps,imgid,connection, done) {
    var query = "UPDATE a003_images SET tags=?,lat=?,lon=?  WHERE id=?";
      if(gps===undefined){
            lat = null;
            lon = null
        }
        else{
            lat = gps.lat;
            lon = gps.lon;
        }   
    var table = [tags,lat,lon,imgid];
    query = mysql.format(query, table);
    connection.query(query, done);
}

