const mongoose=require("mongoose")

//defining schema
const loginSchema=new mongoose.Schema({
    // name:{type:String,required:true,trim:true},
    email:{type:String,required:true,trim:true},
    password:{type:String,required:true,trim:true}
    // repassword:{type:String,required:true,trim:true}
})
//creating model
const loginModel=new mongoose.model("login",loginSchema)
module.exports=loginModel