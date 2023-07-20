// const Mailgen = require('mailgen');
const nodemailer=require('nodemailer');
const enquiryModel=require('../routes/enquiry')


const sendenquiryMail=(req,res)=>{
//   const itemId=req.body.jobid
  enquiryModel.findOne({enquiryemail:req.body.user})
  .then((users) => {
    console.log(users.enquiryemail);
            let config = {
      service: 'gmail',
            auth: {
              user:'hiringcafejobs@gmail.com',
              pass:'ipwslmtdbbzeziws'
      }
  }
  let transporter=nodemailer.createTransport(config);

  
  


  let message={
    from:'<hiringcafejobs@gmail.com>',
    to:users.enquiryemail,
    subject: "Reply from Hiring Cafe",
    html:'<p>Hi   '+users.enquiryname+',<br><br><br> '+req.body.enquiryreply+'</b></p><p>Your last enquiry:'+req.body.msg+'<br><br>With Regards<br>Hiring Cafe'
  }
  transporter.sendMail(message).then(()=>{
          res.redirect('/adminnotifications')
  }).catch((error)=>{
            return res.status(500).json({error})
  })
}).catch()
enquiryModel.findOneAndUpdate({enquiryemail:req.body.user},{action:"Replied"}
)
    .then(() => {
        console.log('Item updated successfully');
        res.redirect('adminnotifications')     
     }) .catch(error => {
        console.error('Failed to update item:', error);
        res.redirect('adminnotifications');
      })
 } 
 


 
module.exports= sendenquiryMail;
