const express = require('express');
const jwt = require('jsonwebtoken');
const mysqlConection = require('../database');
const router = express.Router();

router.post('/forgot_password', (req, res) => {

    const {username} = req.body;
    if(!(username)){
        return res.status(400).json({
            message: 'Username is required!'
        });
    }
    const message = 'Chech your email for a link to reset your password.';
    let verificationLink;
    let emailStatus = 'Ok';
    const query = 'select *from usuario where usuario = ?;';
    const rows = mysqlConection.query(query, [username], (err, rows, fields)=>{
        if(rows.length > 0){
            const user = rows[0];
            const password = user.password;
            const token = jwt.sign({userId: user.id_usuario, username: user.usuario}, process.env.JWT_SECRET, {expiresIn: '5m'});
            verificationLink = `http://localhost:3000/new_password/${token}`;
            //user.resetToken = token;

            const saveQuery = 'UPDATE usuario set token = ? where usuario = ?;';
            
            const rows1 = mysqlConection.query(saveQuery, [token, username], (errs, rows1, fields1) =>{
                //console.log(rows1);
                //console.log(token);
                //if(rows1.length > 0){
                    //const user = rows1[0];

                    //console.log(user.id_usuario, user.usuario, user.token, username);
                    res.status(500).json({
                        username,
                        token,
                        verificationLink
                    });
 
            });

            
            
        }else{
            return res.status(400).json({
                message: err
            });
        }

 
        
    });

   


});



module.exports = router;