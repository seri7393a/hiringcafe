const jobModel=require('../routes/jobpost')

const closejob=(req,res)=>{
    jobModel.findOneAndUpdate({id:req.body.user},{action:"CLOSED"})
    .then(() => {
        console.log('Item updated successfully');
        res.redirect('adminjobpost')     
     }) .catch(error => {
        console.error('Failed to update item:', error);
        res.redirect('adminjobpost');
      })
   
}
module.exports=closejob;