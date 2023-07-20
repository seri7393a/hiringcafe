const mongoose=require("mongoose")

//defining schema
const jobSchema=new mongoose.Schema({
    id:{type:String,required:true,trim:true},
    companyname:{type:String,required:true,trim:true},
    companyaddress:{type:String,required:true,trim:true},
    namevacancy:{type:String,required:true,trim:true},
    noofvacancy:{type:String,required:true,trim:true},
    gender:{type:String,required:true,trim:true},
    companyemail:{type:String,required:true,trim:true},
    companycontact:{type:String,required:true,trim:true},
    experience:{type:String,required:true,trim:true},
    lastdate:{type:String,required:true,trim:true},
    jobfile:{type:String,required:true,trim:true},
    action:{type:String,required:true,trim:true}
})
//creating model
const jobModel=new mongoose.model("jobfile",jobSchema)
module.exports=jobModel