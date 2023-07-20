const Mailgen = require('mailgen');
const nodemailer=require('nodemailer');
const jobModel=require('../routes/jobpost')


const sendjobMail=(req,res)=>{
//   const itemId=req.body.jobid
  jobModel.findOne({id:req.body.user})
  .then((users) => {
    console.log(users.companyemail);
            let config = {
      service: 'gmail',
            auth: {
              user:'hiringcafejobs@gmail.com',
              pass:'ipwslmtdbbzeziws'
      }
  }
  let transporter=nodemailer.createTransport(config);

  
  


  let message={
    from:'hiringcafejobs@gmail.com',
    to:users.companyemail,
    subject: "Verification ID",
    html:'<p>Hi   '+users.companyname+',<br><br><br> The verification ID for your posted job at Hiring Cafe is given below. <br>  !!Note it down for further references and communications!!</p> <br><p>Verification ID:  <u><b style="color:blue">'+users.id+'</u></b><br>Job Title: <b>'+users.namevacancy+'</b><br>No.of vacancies: <b>'+users.noofvacancy+'</b></p><br><br>With Regards<br>Hiring Cafe'
  }
  transporter.sendMail(message).then(()=>{
      
    
    res.redirect('/adminjobpost')
  }).catch((error)=>{
            return res.status(500).json({error})
  })
}).catch()
jobModel.findOneAndUpdate({id:req.body.user},{action:"Verified"})
    .then(() => {
        console.log('Item updated successfully');
        res.redirect('adminjobpost')     
     }) .catch(error => {
        console.error('Failed to update item:', error);
        res.redirect('adminjobpost');
      })
 } 
 


 
module.exports= sendjobMail;
