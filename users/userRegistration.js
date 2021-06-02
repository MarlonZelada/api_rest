const express = require('express');
const mysqlConection = require('../database.js');
const router = express.Router();
const bcryptjs = require('bcryptjs');


router.post('/userRegistration', async(req, res) => {
    const {usuario, password} = req.body;
    
    const _password = req.body.password;
    const _usuario = req.body.usuario;
    console.log(usuario, password);
    
    let passwordHash = await bcryptjs.hash(_password, 10);
    let finalNodeGeneratedHash = passwordHash.replace('$2a$', '$2y$');

    const consulta = 'SELECT *FROM usuario WHERE usuario = ?';
    const query = 'insert into usuario(usuario, password) values(?, ?);';
    
    const rows = mysqlConection.query(consulta, [_usuario], (err, rows, fields) => {
        if(rows.length > 0){
            res.json('El usuario ya Existe');
        }else{
            mysqlConection.query(query, [usuario, finalNodeGeneratedHash], (err, rows, fields) => {
                if(!err){
                    res.json({Status: 'Saved',
                              passwordHash: passwordHash});
                }else{
                    console.log("err");
                }
            });
        }
    })
    
    
    


    







});

module.exports = router;   
    
    
    /**/
    //res.json('Registro de Usuarios');
