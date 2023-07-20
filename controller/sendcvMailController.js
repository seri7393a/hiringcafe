const Mailgen = require('mailgen');
const nodemailer=require('nodemailer');
const cvModel=require('../routes/submitcv')


const sendcvMail=(req,res)=>{
  // const itemId=req.body.cvid
  cvModel.findOne({id:req.body.user}, (error, users) => {
    console.log(users.email);
            let config = {
      service: 'gmail',
      auth: {
        user:'hiringcafejobs@gmail.com',
        pass:'ipwslmtdbbzeziws'
      }
  }
  let transporter=nodemailer.createTransport(config)

  
  


  let message={
    from:'hiringcafejobs@gmail.com',
    to:users.email,
    subject: "Verification ID",
    html:'<p>Hi   '+users.fullname+',<br><br><br> The verification ID for your uploaded CV/Resume at Hiring Cafe is given below. <br>  !!Note it down for further references and communications!!</p> <br>Verification ID:<u> <b style="color:blue;"> '+users.id+'</u></b><br><br>With Regards<br>Hiring Cafe'
  }
  transporter.sendMail(message).then(()=>{
      
  
    res.redirect('/adminuploadcv')
  }).catch((error)=>{
            return res.status(500).json({error})
          } ) 
            cvModel.findOneAndUpdate({id:req.body.user},{action:"Verified"})
    .then(() => {
        console.log('Item updated successfully');
        res.redirect('adminuploadcv')     
     }) .catch(error => {
        console.error('Failed to update item:', error);
        res.redirect('adminuploadcv');
      })
  })
   
 
}


 
module.exports= sendcvMail;
