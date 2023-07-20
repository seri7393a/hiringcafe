const cvModel=require('../routes/submitcv')

const closecv=(req,res)=>{
    cvModel.findOneAndUpdate({id:req.body.user},{action:"CLOSED"})
    .then(() => {
        console.log('Item updated successfully');
        res.redirect('adminuploadcv')     
     }) .catch(error => {
        console.error('Failed to update item:', error);
        res.redirect('adminuploadcv');
      })
   
}
module.exports=closecv;