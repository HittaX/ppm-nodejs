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
        insertBankcard
    */
    insertBankcard : function (req, res, next) {
        var param = req.body || req.params;
        pool.getConnection(function (err, connection) {
            console.log('session_insertBankcard:' + req.session.email);
            var bands = '';
            if (param.option1 == 'Visa') {
                bands += param.option1;
            } if (param.option2 == 'MasterCard') {
                if(bands.length != 0) {
                    bands += ',';
                }
                bands += param.option2;
            } if (param.option3 == 'Unionpay') {
                if(bands.length != 0) {
                    bands += ',';
                }
                bands += param.option3;
            } if (param.option4 == 'JCB') {
                if(bands.length != 0) {
                    bands += ',';
                }
                bands += param.option4;
            }
            console.log(bands);
            var query = connection.query($sql.insertBankcard,
                [req.session.email,param.type,param.cardnumber,bands,param.valid,param.expiry,param.label,param.comments],
                function (err, result) {
                    console.log(query.sql);
                    connection.release();
                    return res.redirect('bankcards');
                });
        });
    },
    /*
        selectBankcard
    */
    selectBankcard : function (req, res, next) {
        var param = req.body || req.params;
        pool.getConnection(function (err, connection) {
            console.log('session_selectBankcard:' + req.session.email);
            var query = connection.query($sql.selectBankcard,req.session.email,
                function (err, result) {
                    console.log(result);
                    connection.release();
                    return res.render('content/bankcards',{result: result});
                })
        })
    }
};