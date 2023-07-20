const loginModel=require('../routes/login')


const resetpswd= (req, res) => {
    
    const updatedValue = req.body.newpassword;
    console.log(updatedValue);
    loginModel.findOne({email:req.body.email}, (error, users) => {
        console.log(users.email);
        if(users.password===req.body.password){
            if(req.body.password!==req.body.newpassword){
    if(req.body.newpassword===req.body.repassword){
    loginModel.findOneAndUpdate({email:req.body.email},{password:req.body.newpassword})
    .then(() => {
        console.log('Item updated successfully');
        res.redirect('admin');
      })
      .catch(error => {
        console.error('Failed to update item:', error);
        res.redirect('resetpassword');
      })}
    else
        res.render('resetpassword');
    
            }else
    res.render('resetpassword')

        }else
        res.render('resetpassword')
    
})}
      module.exports=resetpswd;