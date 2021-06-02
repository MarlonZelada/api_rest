const express = require('express');
const router = express.Router();
const mysqlConection = require('../database.js');
const bcryptjs = require('bcryptjs');


router.post('/login', async (req, res) => {

    const  { usuario } = req.body;
    const password = req.body.password;

    console.log(usuario);
    console.log(password);
    const query = 'select * from usuario where usuario = ?;';

    const rows = mysqlConection.query(query, [usuario], (err, rows, fiels) => {
        if(rows.length > 0){
            
            const user = rows[0];
            const hashSaved = user.password;
            console.log(usuario, hashSaved);
            
            
            
            let compare = bcryptjs.compareSync(password, hashSaved);
            
            if(compare){
                res.json('Welcome');
            }else{
                res.json('No son iguales');
            }
       
        }else{
            res.json('El usuario no existe');
        }
       
    });
    
    
});



module.exports = router;