var mysql = require('mysql');
var crypto = require('crypto');
var $sql = require('./userSqlMapping');

var pool = mysql.createPool({
    connectionLimit : 10,
    host: 'localhost',
    user: 'root',
    password: 'pk2seven257+',
    database: 'ppm',
    port: 3306
});

module.exports = {
    /*
        insertSite module
    */
    insertSite : function (req, res, next) {
        var param = req.body || req.params;
        pool.getConnection(function (err, connection) {
            console.log('sessionPOST:' + req.session.email);
            var cipher = crypto.createCipher('aes-256-cbc','ppmkey');
            var encrypted = cipher.update(param.password, 'utf8', 'hex');
            encrypted += cipher.final('hex');
            console.log(encrypted);
            var query = connection.query($sql.insertSite,[req.session.email,param.url,param.sitename,param.username,encrypted,param.label,param.comments],
                function (err, result) {
                    console.log(query.sql);
                    connection.release();
                    return res.redirect('sites');
                });
        });
    },
    /*
        selectSite module
    */
    selectSite : function (req, res, next) {
        var param = req.body || req.params;
        pool.getConnection(function (err, connection) {
            console.log('session_selectSite' + req.session.email);
            var query = connection.query($sql.selectSite,req.session.email,
                function (err, result) {
                    
                })
        })
    }
};