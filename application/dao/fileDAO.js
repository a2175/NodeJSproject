var mysql = require('mysql');
var mydb = require(_CONFIG + "database");

var connection = mysql.createConnection(mydb.dbSet);

class FileDAO {

    selectFileByIdx(request) {
        var sql = "SELECT * FROM file WHERE idx = ?";
        var params = [request.params.idx];
    
        var result = new Promise(function(resolve, reject) {
          connection.query(sql, params, function (error, results, fields) {
            resolve(results);
          });
        })
    
        return result;
    }

    selectFileByBoardIdx(request) {
        var sql = "SELECT * FROM file WHERE board_idx = ?";
        var params = [request.params.idx];
    
        var result = new Promise(function(resolve, reject) {
          connection.query(sql, params, function (error, results, fields) {
            resolve(results);
          });
        })
    
        return result;
    }
    
    insertFile(request) {
        var sql = 'INSERT INTO file SET board_idx = ?, original_file_name = ?, stored_file_name = ?, file_size = ?, date=now()';
        var fileInfo = request.file;
        var params = [request.params.post_idx, fileInfo.originalname, fileInfo.filename, fileInfo.size];
    
        var result = new Promise(function(resolve, reject) {
          connection.query(sql, params, function (error, results, fields) {
            resolve();
          });
        })
    
        return result;
    }
    
    deleteFile(request) {
        var sql = "DELETE FROM file WHERE idx = ?";
        var params = [request.params.idx];
    
        var result = new Promise(function(resolve, reject) {
          connection.query(sql, params, function (error, results, fields) {
            resolve(results);
          });
        })
    
        return result;
    }

}

module.exports = new FileDAO();
