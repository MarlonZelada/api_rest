const express = require('express');
const router = express.Router();

const nodemailer = require('nodemailer');
const bcryptjs = require('bcryptjs');
const mysqlConection = require('../database');
const jwt = require('jsonwebtoken');

let textAccount =  nodemailer.createTestAccount();
let transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
    user: process.env.GMAIL_USER, // generated ethereal user
    pass: process.env.GMAIL_ACCESS, // generated ethereal password
    },
});



//Login User
router.post('/user/login', async (req, res) => {
    const { usuario, password } = req.body;
    //Find if user exists
    const search_user = 'select * from usuario where usuario = ?;';
    const rows = mysqlConection.query(search_user, [usuario], (err, rows, fields) => {
        if(rows.length > 0){
            const user =  rows[0];
            const hashSaved = user.password;
            //Compare the entered user with the saved user
            let compare = bcryptjs.compareSync(password, hashSaved);
            if(compare){
                res.json('Welcome');
            }else{
                res.json('User or Password does not exist');
            }
        }else{
            res.json('User or password does not exist');
        }
    });

});

//Register new user
router.post('/user/newUser', async(req, res) => {
    const { name, usuario, password } = req.body;
    console.log(name, usuario, password);

    let passwordHash = await bcryptjs.hash(password, 10);
    let finalHash = passwordHash.replace('$2a$', '$2y$');

    const search_user = 'select *from usuario where usuario = ?';

    const rows = mysqlConection.query(search_user, [usuario], (err, rows, fields) => {
        if(rows.length > 0){
            res.json('User already exists');
        }else{
            //Saved new User    
            const query = 'insert into usuario(nombre, usuario, password) values(?, ?, ?);';
                mysqlConection.query(query, [name, usuario, finalHash], (err, rows, fields) => {
                if(!err){
                    //Datos para obtener el token
                    const queryI = 'select *from usuario where usuario = ?;';  
                    const fila = mysqlConection.query(queryI, [usuario], (errs, fila, fields)=>{
                        user1 = fila[0];
                        console.log(user1.usuario);
                        const token = jwt.sign({userId: user1.id_usuario, username: user1.usuario}, process.env.JWT_SECRET, {expiresIn: '30m'});
                        //Saved Token
                        const querySavedToken = 'update usuario set token = ? where usuario = ?;';
                        const filas2 = mysqlConection.query(querySavedToken, [token, user1.usuario], (errs, filas2, fields)=>{
                            console.log('token Guardado');
                        })
                        
                        verificationLink = `http://localhost:3000/activate_account/${token}`;


                        console.log(token);
                    
                        let info =  transporter.sendMail({
                            from: '"Fred Foo 👻" <marlon.zelada@gmail.com>', // sender address
                            to: usuario, // list of receivers
                            subject: "Confirmar Correo ✔", // Subject line
                            text: `Bienvenido a Todogar ${name}`, // plain text body
                            html: `<b>Bienvenido a Todogar </b>
                                    ${name}
                                    <b>, click en el siguiente enlace para activar tu cuenta </b> </>
                                   ${verificationLink}`, // html body
                        });
                    });
                    //console.log("Message sent: %s", info.messageId);
                    res.json('Saved')
                }else{
                    res.json(err);
                }
            });
        }
    });
 });

router.put('/activate_account', (req, res)=>{
    const token = req.headers.reset;

    if(!(token)){
        res.status(400).json({
            message: 'All the fiels are required'
        });
    }
    let jwtPayload;
    jwtPayload = jwt.verify(token, process.env.JWT_SECRET);
    
    try{
        const query = 'select *from usuario where token = ?;';
        const rows = mysqlConection.query(query, [token], (err, rows, fields)=>{
        if(rows.length > 0){
            const queryA = 'update usuario set estado = 1 where token = ?;';
            const filas = mysqlConection.query(queryA, [token], (errs, filas, fields)=>{
            res.json({status: 'Account activated'});
            });
        }else{
            return res.json({status: 'no encontrado'});
        }
    });
    }catch(err){
        console.log('Token expirado');
    }
    

});




module.exports = router;