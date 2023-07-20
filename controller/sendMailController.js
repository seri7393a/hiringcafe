const Mailgen = require('mailgen');
const nodemailer=require('nodemailer');
const loginModel=require('../routes/login')


const sendMail=(req,res)=>{
  loginModel.findOne({email:req.body.email}, (error, users) => {
    console.log(users.email);
    if (users.email==='hiringcafejobs@gmail.com') {
        let config = {
      service: 'gmail',
      auth: {
              user:'hiringcafejobs@gmail.com',
              pass:'ipwslmtdbbzeziws'
          
      }
  }
  let transporter=nodemailer.createTransport(config);

  let MailGenerator=new Mailgen({
    theme:"default",
    product:{
        name:'Hi',
        link:'https://mailgen.js/'
    }
  })
 


  let message={
    from:'<hiringcafejobs@gmail.com>',
    to:"hiringcafejobs@gmail.com",
    subject: "To Retrieve Forgotten Password",
    html:'<p>Hi User,<br><br><br> please login with the below given username & password <br>  !!Do not forget to reset password after login!!</p> <br><h4 style="color:blue;"> Username:  '+users.email+'<br> Password:  '+users.password+'</h4><br><br>Thank You<br>Hiring Cafe'
  }
  transporter.sendMail(message).then(()=>{
    res.render('pswdrecovery')
  }).catch((error)=>{
        return res.status(500).json({error})
  })
    }
else{
    res.render('forgetpassword')
}
 } )}
module.exports= sendMail;
