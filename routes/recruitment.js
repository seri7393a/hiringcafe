const mongoose=require("mongoose")

//defining schema
const placementSchema=new mongoose.Schema({
    Date:{type:String,required:true,trim:true},
    plcname:{type:String,required:true,trim:true},
    plcdesignation:{type:String,required:true,trim:true},
    plccompany:{type:String,required:true,trim:true},
    // plcsalary:{type:String,required:true,trim:true},
    plcimage:{type:String,required:true,trim:true}
    
})
//creating model
const placementModel=new mongoose.model("placement",placementSchema)
module.exports=placementModel