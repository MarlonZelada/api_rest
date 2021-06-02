const express = require('express');
const app = express();
const bcryptjs = require('bcryptjs');
const nodemailer = require('nodemailer');


//Solicitar modulo
//if(process.env.NODE_ENV != 'production'){
    require('dotenv').config();
//}

//Routes
//Solicitamos la ruta que necesitamos usar
const mysqlConection = require('./database.js');
const { MarketplaceCommerceAnalytics } = require('aws-sdk');
const { getMaxListeners } = require('./database.js');

//Middlewares
//Para enterder el formato y acceder a su información
app.use(express.json());
app.use(express.urlencoded({extended:false}));




//Rutas para Users
app.use(require('./users/login'));
app.use(require('./users/userRegistration'));
app.use(require('./users/recoverPassword'));
app.use(require('./users/forgot_password'));
app.use(require('./users/new_password'));
app.use(require('./users/user'));

app.use(require('./users/correo'));





//Settings

//Definimos el puerto
app.set('port', process.env.PORT || 3000);


//Starting the server

//Usamos el puerto
app.listen(app.get('port'), ()=>{
    console.log('SERVER UP ON PORT', app.get('port'));
})








  









/*app.get('/compare',(req, res)=>{
    let hashSaved = '$2a$08$UnDTKO/vu8uOvpwGNN7QiO6xEA1nY.dY9rkgWaFhgvWDqqawaOK7y';
     let compare = bcryptjs.compareSync('12345', hashSaved);
     if(compare){
        res.json('ok'); 
     }else{
         res.json('No son iguales');
     }
});*/


/*app.post('/logi',  async(req, res)=>{
    //datos que vamos a cargar en postman
    const user = req.body.user;
    const password = req.body.password;
    if(user == 'admin' && password == '12345'){
        let passwordHash =  await bcryptjs.hash(password, 8);
        res.json({
            message:'Nitido',
            passwordHash: passwordHash
        });
    }else{
        res.json({
            message:'Fallo'
        })
    }
});*/

/*var query = mysqlConection.query('select *from usuario', function(error, resultado){
    if(error){
        throw error;
    }else{
        console.log(resultado);
    }
});*/