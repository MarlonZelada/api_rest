const express = require('express');
const jwt = require('jsonwebtoken');
const mysqlConection = require('../database');
const router = express.Router();


router.put('/new_password', (req, res)=>{
    const {newPassword} = req.body;
    const resetToken = req.headers.reset;

    if(!(resetToken && newPassword)){
        res.status(400).json({
            message: 'All the fiels are required'
        });
    }

    let jwtPayload;
    jwtPayload = jwt.verify(resetToken, process.env.JWT_SECRET);
    const query = 'select *from usuario where token = ?;';
    const rows = mysqlConection.query(query, [resetToken], (err, rows, fields)=>{
        if(rows.length > 0){
            res.json({status: 'Encontrado'});
        }else{
            return res.json({status: 'no encontrado'});
        }
    });


    /*return res.status(401).json({
        message: 'Algo salio Mal'
    })*/






});

module.exports = router;