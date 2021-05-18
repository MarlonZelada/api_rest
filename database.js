const mysql = require('mysql');

const mysqlConecction = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'todogar',
    multipleStatements: true
});

mysqlConecction.connect(function(err){
    if(err){
        console.error(err);
        return;
    }else{
        console.log('db is connected');
    }
});

module.exports = mysqlConecction;