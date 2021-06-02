const mysql = require('mysql');

const mysqlConection = mysql.createConnection({
    host: process.env.HOST,
    user: process.env.USER,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
    multipleStatements: true
});

mysqlConection.connect(function(err){
    if(err){
        console.error(err);
        return;
    }else{
        console.log('db is connected');
    }
});

module.exports = mysqlConection;