const express = require('express');
const app = express();

const mysqlConecction = require('./database.js');

var query = mysqlConecction.query('select *from pregunta', function(error, resultado){
    if(error){
        throw error;
    }else{
        console.log(resultado);
    }
});




const bcryptjs = require('bcryptjs');

app.use(express.urlencoded({extended:false}));
app.use(express.json());

app.post('/login',  async(req, res)=>{
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
});

app.get('/compare',(req, res)=>{
    let hashSaved = '$2a$08$UnDTKO/vu8uOvpwGNN7QiO6xEA1nY.dY9rkgWaFhgvWDqqawaOK7y';
     let compare = bcryptjs.compareSync('12345', hashSaved);
     if(compare){
        res.json('ok'); 
     }else{
         res.json('No son iguales');
     }
});

app.listen(3000, ()=>{
    console.log('SERVER UP');
})