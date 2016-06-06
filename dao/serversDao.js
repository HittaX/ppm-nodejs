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
        insertServer module
    */
    insertServer : function (req, res, next) {
        var param = req.body || req.params;
        pool.getConnection(function (err, connection) {
            console.log('session_insertServer:' + req.session.email);
            var cipher = crypto.createCipher('aes-256-cbc','ppmkey');
            var encrypted = cipher.update(param.password, 'utf8', 'hex');
            encrypted += cipher.final('hex');
            console.log(encrypted);
            var query = connection.query($sql.insertServer,[req.session.email,param.address,param.username,encrypted,param.port,param.label,param.comments],
                function (err, result) {
                    console.log(query.sql);
                    connection.release();
                    return res.redirect('servers');
                });
        });
    },
    /*
        selectServer module
    */
    selectServer : function (req, res, next) {
        var param = req.body || req.params;
        pool.getConnection(function (err, connection) {
            console.log('session_selectServer:' + req.session.email);
            var query = connection.query($sql.selectServer,req.session.email,
                function (err, result) {
                    console.log(result);
                    connection.release();
                    // return res.render('sites');
                    // console.log(result.length);
                    for ( var i = 0; i < result.length; i++)
                    {
                        var decipher = crypto.createDecipher('aes-256-cbc','ppmkey');
                        var decrypted = decipher.update(result[i].password_aes,'hex', 'utf8');
                        // console.log(result[i].password_aes);
                        decrypted += decipher.final('utf8');
                        result[i].password_aes = decrypted;
                    }
                    return res.render('content/servers',{result: result});
                })
        })
    }
};