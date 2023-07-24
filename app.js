var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const bodyParser=require('body-parser');
const multer=require('multer');
const nodemailer=require('nodemailer');
const jwt=require('jsonwebtoken');

const AWS = require('aws-sdk');
const dotenv=require("dotenv");




dotenv.config()

const loginModel=require('./routes/login')
const jobModel=require('./routes/jobpost');
const placementModel=require('./routes/recruitment');
const enquiryModel=require('./routes/enquiry');
const cvModel=require('./routes/submitcv');
var usersRouter = require('./routes/users');
var adminRouter = require('./routes/admin');
const sendMailController = require('./controller/sendMailController');
const resetpswdController = require('./controller/resetpswdController');
const sendcvMailController = require('./controller/sendcvMailController');
const sendjobMailController = require('./controller/sendjobMailController');
const closejobController = require('./controller/closejobController');
const closecvController = require('./controller/closecvController');
const sendenquiryMailController = require('./controller/sendenquiryMailController');


 const connectDB=require('./routes/config/connectdb');
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())







app.use('/', usersRouter);
app.use('/admin', adminRouter);

// app.get('/', function(req, res, next) {
//   res.render('index');
// });




app.post('/admindashboard', async(req, res, next)=> {
 try{
  loginModel.findOne({email:req.body.email}, (error, users) => {
    if (users.password===req.body.password) {
      enquiryModel.find({action:"Unread"}).sort({_id:-1})
  .then((msgdocument)=>{
    res.render('admindashboard',{msgdocument})
   
  }).catch((err)=>{
      console.log(err);})
    } else {
      
      res.render('admin')
    }
  });
   
 }
catch{}})





app.get('/admin', function(req, res, next) {
  
  res.render('admin')
})


  



app.get('/adminaddplacement', function(req, res, next) {
  res.render('adminaddplacement');
});
app.get('/dashboard', function(req, res, next) {
  enquiryModel.find({action:"Unread"}).sort({_id:-1})
  .then((msgdocument)=>{
    res.render('admindashboard',{msgdocument})
});})

app.get('/cvmailconfirmation', function(req, res, next) {
  res.render('cvmailconfirmation');
});
app.get('/enquiryconfirmation', function(req, res, next) {
  res.render('enquiryconfirmation');
});
app.get('/jobmailconfirmation', function(req, res, next) {
  res.render('jobmailconfirmation');
});
app.get('/editplacement', function(req, res, next) {
  res.render('editplacement');
});
app.get('/jobclose', function(req, res, next) {
  res.render('jobclose');
});
app.get('/cvclose', function(req, res, next) {
  res.render('cvclose');
});
app.get('/resetpassword', function(req, res, next) {
  res.render('resetpassword');
});
app.get('/pswdrecovery', function(req, res, next) {
  res.render('pswdrecovery');
});
app.get('/login', function(req, res, next) {
  res.render('signup');
});

app.get('/forgetpassword', function(req, res, next) {
  res.render('forgetpassword');
});
app.get('/adminjobpost',function(req, res) {
  jobModel.find().sort({action:-1})
  .then((document)=>{
    res.render('adminjobpost',{document})
    console.log(document);
  }).catch((err)=>{
      console.log(err);
  })
  
});

app.post('/update/:id', (req, res) => {
  const itemId = req.params.id;
  const updatedValue = "Verified";
  console.log(itemId);
  // Find the item by ID and update its value
  jobModel.findById(itemId)
  .then((users) => {
      console.log(users.id);
      if(users.action==="Verify"){
        res.render('jobmailconfirmation',{users})
        
        }
      else{
        if(users.action==="Verified"){
        res.render('jobclose',{users})
}
else{
  if(users.action==="CLOSED")
  res.redirect('/adminjobpost')
}}})
});

app.post('/updatecv/:id',(req,res)=>{
  const itemId = req.params.id;
  cvModel.findById(itemId)
  .then((users) => {
      console.log(users.id);
      if(users.action==="Verify"){
        res.render('cvmailconfirmation',{users})
        
        }
      else{
        if(users.action==="Verified"){
        res.render('cvclose',{users})
}
else{
  if(users.action==="CLOSED")
  res.redirect('/adminuploadcv')
}}})})
        
    
  

  


app.post('/updatemsg/:id', (req, res) => {
  const itemId = req.params.id;
  // const updatedValue = "Reply";
  console.log(itemId);
  // Find the item by ID and update its value
  enquiryModel.findById(itemId)
  .then((users) => {
            if(users.action==="Unread"){
        res.render('enquiryconfirmation',{users})
        
        }
      else{
        if(users.action==="Replied"){
          res.redirect('/adminnotifications')
        }
}})
});

app.post('/login',(req,res)=>{
  
   const file = new loginModel({
    
        email:req.body.email,
        password:req.body.password
        
        });
       file.save();
       res.render('admin')
      })

app.get('/updateplacement/:id',(req,res
  )=>{
  const itemId=req.params.id;
      placementModel.findById(itemId)
      .then((docs) => {
          console.log('Item updated successfully');
          res.render('editplacement',{docs})     
       }) .catch(error => {
          console.error('Failed to update item:', error);
          res.redirect('/adminevents');
      })}
);

app.post('/updaterecruitment/:id',(req,res)=>{
  console.log(req.params.id);
  placementModel.findByIdAndUpdate({_id:req.params.id},{Date:req.body.Date,plcname:req.body.plcname,plcdesignation:req.body.plcdesignation,plccompany:req.body.plccompany,plcsalary:req.body.plcsalary})
    .then(() => {
        console.log('Item updated successfully');
        res.redirect('/adminplacement')     
     }) .catch(error => {
        console.error('Failed to update item:', error);
        res.redirect('/admindashboard');
      })
    })

app.post('/deleteplacement/:id',(req,res)=>{
  console.log(req.params.id);
  placementModel.findByIdAndDelete({_id:req.params.id})
    .then(() => {
        console.log('Item updated successfully');
        res.redirect('/adminplacement')     
     }) .catch(error => {
        console.error('Failed to update item:', error);
        res.redirect('/admindashboard');
      })
});

app.post('/deleteenquiry/:id',(req,res)=>{
  console.log(req.params.id);
  enquiryModel.findByIdAndDelete({_id:req.params.id})
    .then(() => {
        console.log('Item updated successfully');
        res.redirect('/adminnotifications')     
     }) .catch(error => {
        console.error('Failed to update item:', error);
        res.redirect('/admindashboard');
      })
});

app.post('/deletejob/:id',(req,res)=>{
  console.log(req.params.id);
  jobModel.findByIdAndDelete({_id:req.params.id})
    .then(() => {
        console.log('Item updated successfully')
        res.redirect('/adminjobpost')     
     }) .catch(error => {
        console.error('Failed to update item:', error);
        res.redirect('/admindashboard')
      })
});

app.post('/deletecv/:id',(req,res)=>{
  console.log(req.params.id);
  cvModel.findByIdAndDelete({_id:req.params.id})
    .then(() => {
        console.log('Item updated successfully');
        res.redirect('/adminuploadcv')     
     }) .catch(error => {
        console.error('Failed to update item:', error);
        res.redirect('/admindashboard');
      })
});

 

 


app.post('/forgetpswd',sendMailController);
app.post('/resetpswd',resetpswdController);
app.post('/sendcvmail',sendcvMailController);
app.post('/sendjobmail',sendjobMailController);
app.post('/closejob',closejobController);
app.post('/closecv',closecvController);
app.post('/sendenquirymail',sendenquiryMailController);



app.get('/adminuploadcv', function(req, res, next) {
  cvModel.find().sort({  action:-1})
  .then((cvdocument)=>{
    res.render('adminuploadcv',{cvdocument})
    
  }).catch((err)=>{
      console.log(err);
  })
});


// 
      
    // }})
app.get('/adminplacement', function(req, res, next) {
  placementModel.find().sort({_id:-1})
  .then((placementdocument)=>{
    res.render('adminplacement',{placementdocument})
    
  }).catch((err)=>{
      console.log(err);
  })
  
});
app.get('/adminnotifications', function(req, res, next) {
  enquiryModel.find().sort({action:-1,Date:-1})
  .then((msgdocument)=>{
    res.render('adminnotifications',{msgdocument})
   
  }).catch((err)=>{
      console.log(err);
  })
  
});




connectDB("mongodb+srv://hiringcafe:root@hiringcafe.rmpdodq.mongodb.net/hiringcafe?retryWrites=true&w=majority")
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

const awsConfig={
  accessKeyId: process.env.AccessKey,
  secretAccessKey: process.env.SecretKey,
  region: process.env.region
};
const s3=new AWS.S3(awsConfig)




  // const s3 = new AWS.S3({
  //   accessKeyId: 'AKIA6M6ZG37XG2W2ASVK',
  //   secretAccessKey: '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',
  //   region: 'us-east-1'
  // });
  
s3.listBuckets( (err, data) => {
  if (err) console.error(err);
  console.log(data.Buckets)
});


// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

// const getDocument=async()=>{
//   jobModel.find();
// }
// getDocument();
module.exports = app;
