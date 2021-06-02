const express = require('express');
const app = express();
const router = express.Router();


 const mysqlConection = require('./database.js');

router.get('/', (req, res) =>{
    mysqlConection.query('select *from usuario', (err, rows, fiels) => {
        if(err){
            console.log(err);
        } else {
            res.jason(rows);
        }
    })
});

module.exports = router;
//Login

//Register


//Recover password

