const mongoose=require("mongoose")

//defining schema
const enquirySchema=new mongoose.Schema({
    Date:{type:String,required:true,trim:true},
    enquiryname:{type:String,required:true,trim:true},
    enquiryemail:{type:String,required:true,trim:true},
    enquirycontact:{type:String,required:true,trim:true},
    enquirymsg:{type:String,required:true,trim:true},
    action:{type:String,required:true,trim:true}
})
//creating model
const enquiryModel=new mongoose.model("enquiry",enquirySchema)
module.exports=enquiryModel