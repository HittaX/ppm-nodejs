var mysql = require('mysql');
var crypto = require('crypto');
// var $util = require('../util/util');
var $sql = require('./userSqlMapping');

var config = {
    hashBytes: 32,
    saltBytes: 32,
    iterations: 10000,
    algorithm: 'sha256'
};

var pool = mysql.createPool({
    connectionLimit : 10,
    host: 'localhost',
    user: 'root',
    password: 'pk2seven257+',
    database: 'ppm',
    port: 3306
});

var jsonWrite = function (res,ret) {
    if(typeof ret === 'undefined') {
        res.json({
            code : '1',
            msg : 'failed operation'
        });
    } else {
        res.json(ret);
    }
};

module.exports = {
    /*
        insert module
    */
    insert : function (req, res, next) {
        var param = req.body || req.params;
        pool.getConnection( function (err, connection) {
            var query = connection.query($sql.selectByEmail,param.email,function (err,result) {
                
                if (result.length == 0) {
                    crypto.randomBytes(config.saltBytes, function (err, salt) {
                    if (err) { throw err; }
                    
                    crypto.pbkdf2(param.password, salt, config.iterations, config.hashBytes,config.algorithm, 
                        function (err, hash) {
                            if (err) { throw err; }
                            query = connection.query($sql.insert,[param.email, hash.toString('hex'), salt.toString('hex')],function (err, result) {
                                if(result) {
                                    result = {
                                        code: 200,
                                        msg: 'successful operation'
                                    };
                                } else {
                                    result = {
                                        code: 111,
                                        msg: 'signup failed'
                                    };
                                }   
                            });
                        });
                    });
                } else {
                    result = {
                        code: 111,
                        msg: 'existUser'
                    };
                }
                // jsonWrite(res,result);
                connection.release();
                return res.redirect('/signin');
            });
            console.log(query.sql);
        });
    },
    
    /*
        login module
    */
    login :function (req, res, next) {
        var param = req.body || req.params;
        var resLabel = 0;
        pool.getConnection( function (err, connection) {
            var query = connection.query($sql.selectByEmail,param.email,function (err,result) {
                if (result.length == 0) {
                    return res.redirect('/signin');
                } else  {
                    crypto.pbkdf2 (param.password, new Buffer(result[0].salt,'hex'), config.iterations, config.hashBytes,config.algorithm, function (err, hash) {
                        if (hash.toString('hex') === result[0].password ) {
                            res.locals.email = result[0].email;
                            req.session.email = res.locals.email;
                            console.log(req.session.email);
                            res.redirect('/content/dashboard');
                        } else {
                            console.log(query.sql);
                            resLabel = 112;
                            res.redirect('/signin');
                        }
                    });
                }
                connection.release();
            }); 
        });
    },
};