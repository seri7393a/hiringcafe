const mongoose=require('mongoose')
const connectDB=async ()=>{
    try{
        
    await mongoose.connect("mongodb+srv://hiringcafe:root@hiringcafe.rmpdodq.mongodb.net/hiringcafe?retryWrites=true&w=majority")

    console.log("Mongodb connected");
}catch(error){
    console.log("Failed connection");
}
}
 module.exports=connectDB