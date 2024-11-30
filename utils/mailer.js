var _ = require('lodash');	
var nodemailer = require('nodemailer');

var config = {
    host: 'smtp.gmail.com',
    port: 587,
    auth: {
        user: 'javalok2011@gmail.com',
        pass: 'abcdefg1234'
    }
};
    
var transporter = nodemailer.createTransport(config);

var defaultMail = {
    from: 'lokendra@gmail.com',
    text: 'test text',
};


const send = (to, subject, html) => {
    // use default setting
    mail = _.merge({html}, defaultMail, to);
    
    // send email
    transporter.sendMail(mail, function(error, info){
        if(error) return console.log(error);
        console.log('mail sent:', info.response);
    });
}
module.exports = {
    send
}