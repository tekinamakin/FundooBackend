

 var nodeMailer = require('nodemailer');
 exports.sendEmail = (url,email) => {
    var transport = nodeMailer.createTransport({
        service : 'gmail',
        auth : {
            user : process.env.email,
            pass : process.env.password
        },       
    })
    const mailOption = {
        from    : process.env.email,
        to      : email,
        subject : "Email Activation Link ",
        text    : 'Your Email Verification link is ' + url
    };
    transport.sendMail(mailOption,(err,result) => {
        if(err){
            console.log("Error In Message Sending ",err)
        }
        else{
            console.log(" result on Sending Mails ", result)
        }
    })
 }