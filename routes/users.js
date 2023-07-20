var express = require('express');
var router = express.Router();
const AWS = require('aws-sdk');
const bodyParser=require('body-parser');
const dotenv=require("dotenv")
dotenv.config()
// const AwsClient=require('./config/awsClient')
const multer=require('multer');

const enquiryModel=require('./enquiry');
const placementModel=require('./recruitment');



const cvModel=require('./submitcv');
const jobModel=require('./jobpost');

// const formidable=require('formidable');

// }
router.use(bodyParser.json())
router.use(bodyParser.urlencoded({extended:true}))



function generateCustomId() {
  // Logic to generate your customized ID
  // For example, you can use a combination of a timestamp and a random number
  const timestamp = "HCjob";
  const randomNum = Math.floor(Math.random() * 1000).toString();

  return timestamp + randomNum;
}

function generateCustomcvId() {
  // Logic to generate your customized ID
  // For example, you can use a combination of a timestamp and a random number
  const timestamp = "HCcv";
  const randomNum = Math.floor(Math.random() * 1000).toString();

  return timestamp + randomNum;
}
const awsConfig={
  accessKeyId: process.env.AccessKey,
  secretAccessKey: process.env.SecretKey,
  region: process.env.region
};
const s3=new AWS.S3(awsConfig)



//multer config
let upload=multer({
  limits:10*1024*1024,
  fileFilter:function(req,file,done){
    if(file.mimetype==='application/pdf' || file.mimetype==='image/jpeg' || file.mimetype==='image/jpg' || file.mimetype==='image/png'){
      done(null,true)
    }else{
      done("File type is not supported",false)
    }
  }
})








//upload to s3 bucket
const uploadToS3=(fileData)=>{
  return new Promise((resolve,reject)=>{
    const params={
      Bucket:'hiringcafepdf',
      Key:`${Date.now()}.pdf`,
      Body:fileData
    }
    s3.upload(params,(err,data)=>{
      if(err){
        console.log(err);
      reject(err)      }
      console.log(data)
      return resolve(data)
    })
  })
}



//upload to s3 bucket
const uploadToSS3=(fileData)=>{
  return new Promise((resolve,reject)=>{
    const params={
      Bucket:'jobpdf',
      Key:`${Date.now()}.pdf`,
      Body:fileData
    }
    s3.upload(params,(err,data)=>{
      if(err){
        console.log(err);
      reject(err)      }
      console.log(data)
      return resolve(data)
    })
  })
}
const uploadToImageS3=(fileData)=>{
  return new Promise((resolve,reject)=>{
    const params={
      Bucket:'eventimagehc',
      Key:`${Date.now()}.jpg`,
      Body:fileData
    }
    s3.upload(params,(err,data)=>{
      if(err){
        console.log(err);
      reject(err)      }
      console.log(data)
      return resolve(data)
    })
  })
}







/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title:'Express'});
});
router.get('/jobsearch',function(req,res){
  res.render('users/jobsearch')
})
router.get('/enquiry',function(req,res){
  res.render('users/enquiry')
})
router.get('/about',function(req,res){
  res.render('users/about')
})
router.get('/submitcvfile',function(req,res){
  res.render('users/submitcvfile')
})

router.get('/submitcv',function(req,res){
  res.render('users/submitcv')
})

router.get('/gallery',function(req, res, next) {
  placementModel.find().sort({_id:-1})
  .then((placementdocument)=>{
    res.render('users/gallery',{placementdocument})
    
  }).catch((err)=>{
      console.log(err);
  })
  
})

router.get('/jobpost',function(req,res){
  res.render('users/jobpost')
})

router.get('/jobsuccess',function(req,res){
  res.render('users/jobsuccess')
})

router.get('/msgsuccess',function(req,res){
  res.render('users/msgsuccess')
})
router.get('/cvsuccess',function(req,res){
  res.render('users/cvsuccess')
})

router.get('/services',function(req,res){
  res.render('users/services')
})
router.get('/clienthomepage',(req,res)=>{
  res.render('users/clienthomepage')
})
router.get('/contact',function(req,res){
  res.render('users/contact')
})

router.get('/adminlogin',function(req,res){
  res.render('adminlogin')
})

// 

router.post('/cvsuccess',upload.single("cvfile"),(req,res)=>{
  const customcvId = generateCustomcvId();
  if(req.file){
    uploadToS3(req.file.buffer).then((result)=>{
      
      const file = new cvModel({
        id:customcvId,
        fullname:req.body.fullname,
        contactaddress:req.body.contactaddress,
        jobapply:req.body.jobapply,
        age:req.body.age,
        gender:req.body.gender,
        email:req.body.email,
        contact:req.body.contact,
        experience:req.body.experience,
        dob:req.body.dob,
        cvfile:result.Location,
        action:"Verify" });
       file.save();
        
      })
      res.render('users/cvsuccess')
      
    }})
    router.post('/placement',upload.single("plcimage"),(req,res)=>{
      if(req.file){
        uploadToImageS3(req.file.buffer).then((data)=>{
          const image = new placementModel({
            Date:req.body.Date,
            plcname:req.body.plcname,
            plcdesignation:req.body.plcdesignation,
            plccompany:req.body.plccompany,
            // plcsalary:req.body.plcsalary,
            plcimage:data.Location
             });
             image.save();
             res.redirect('/adminplacement')
        })
        
      }
    })
    
    
    
    router.post('/jobpost',upload.single("jobfile"),(req,res)=>{
      const customId = generateCustomId();
      
      if(req.file){
        uploadToSS3(req.file.buffer).then((result)=>{
          
          const file = new jobModel({
            id:customId,
            companyname:req.body.companyname,
            companyaddress:req.body.companyaddress,
            namevacancy:req.body.namevacancy,
            noofvacancy:req.body.noofvacancy,
            gender:req.body.gender,
            companyemail:req.body.companyemail,
            companycontact:req.body.companycontact,
            experience:req.body.experience,
            lastdate:req.body.lastdate,
            jobfile:result.Location,
            action:"Verify"});
           file.save();
      
          })
          res.render('users/jobsuccess')
          
        }})
    

        
        router.post('/enquiry',(req,res)=>{
          date=new Date().toDateString();
           const file = new enquiryModel({
            
                Date:date,
                enquiryname:req.body.enquiryname,
                enquiryemail:req.body.enquiryemail,
                enquirycontact:req.body.enquirycontact,
                enquirymsg:req.body.enquirymsg,
                action:'Unread'
                });
               file.save();
               res.render('users/msgsuccess')
              })
              
       
              
              


              
// 



  module.exports = router;