const express = require('express');
const app = express();

const bcryptjs = require('bcryptjs');

app.use(express.urlencoded({extended:false}));
app.use(express.json());

app.post('/login',  (req, res)=>{
    //datos que vamos a cargar en postman
    const user = req.body.user;
    const password = req.body.password;
    if(user == 'admin' && password == '12345'){
        res.json({
            message:'Nitido'
        });
    }else{
        res.json({
            message:'Fallo'
        })
    }
})

app.listen(3000, ()=>{
    console.log('SERVER UP');
})