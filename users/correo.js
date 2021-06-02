const express = require('express');
const router = express.Router();
const aws = require('aws-sdk');


var nodemailer = require('nodemailer');




/*aws.config.update({
    accessKeyId : process.env.AWS_ACCESS_KEY,
    secretAccessKey : process.env.AWS_ACCESS_SECRET,
    region: process.env.REGION
});
const ses = new aws.SES({ apiVersion : '2010-12-01' });
let params = {
    Destination : {
        ToAddresses : [
            "marlon.zelada@gmail.com"
        ]
    },
    ConfigurationSetName : "config",
    Message : {
        Body : {
            Html : {
                Charset : 'UTF-8',
                Data : '<div>Hola Mundo</div>'
            }
        },
        Subject : {
            Charset : 'UTF-8',
            Data : 'Test email'
        }
    },
    Source : 'test@todogar.com'
}
let sendPromise = ses.sendEmail(params).promise();
sendPromise.then(
    function(data){
        console.log(data.MessageId);
        console.log(data)
    }
).catch(
    function(err){
        console.log(err, err.stack);
    }
)






/*router.get('/correo', (req, res) =>{
    //Creamos objeto de transporte
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'marlon.zelada@gmail.com',
            pass: 'Marlon123zelada.'
        }
    });

    var mensaje = "Hola desde nodejs...";

    //Crear objeto de opciones con la información correspondiente
    var mailOptions = {
        from: 'marlon.zelada@gmail.com',
        to: 'marlon_zelada@gmail.com',
        subject: 'Asunto del correo',
        text: mensaje
    };
    
    transporter.sendMail(mailOptions, function(error, info){
        if(error){
            console.log(error);
        } else {
        console.log('email enviado: ' + info.response);
        }
    });

});*/









module.exports = router;