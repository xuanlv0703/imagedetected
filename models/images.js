var mysql = require('mysql');

exports.save = function(imgObj,connection, done) {
    var query = "INSERT INTO a003_images(path,uid,tags,aid,created) VALUES ";
    // var table = [imgObj.path,imgObj.uid,imgObj.tags,imgObj.aid];
    var rows = [], table = []
    imgObj.map(function(img) {
        rows.push('(?,?,?,?,now())')
        table.push(img.path, img.uid, img.tags || '', img.aid)
    })
    query = mysql.format(query + rows.join(", "), table);
    console.log(query)
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

exports.frompaths = function(paths,connection, done) {
    var query = "SELECT * FROM a003_images WHERE path IN (?)";
    // var table = ;
    query = mysql.format(query, [paths]);
    console.log(query);
    connection.query(query, done);
};