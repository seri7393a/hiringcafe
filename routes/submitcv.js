const mongoose=require("mongoose")

//defining schema
const cvSchema=new mongoose.Schema({
    id:{type:String,required:true,trim:true},
    fullname:{type:String,required:true,trim:true},
    contactaddress:{type:String,required:true,trim:true},
    jobapply:{type:String,required:true,trim:true},
    age:{type:String,required:true,trim:true},
    gender:{type:String,required:true,trim:true},
    email:{type:String,required:true,trim:true},
    contact:{type:String,required:true,trim:true},
    experience:{type:String,required:true,trim:true},
    dob:{type:String,required:true,trim:true},
    cvfile:{type:String,required:true,trim:true},
    action:{type:String,required:true,trim:true}
})
//creating model
const cvModel=new mongoose.model("cvfile",cvSchema)
module.exports=cvModel