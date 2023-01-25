const User = require('../models/User');


const Login =  async (req,res)=>{
    try {
      if(req.body.password && req.body.email)
      {
          let user = await User.findOne(req.body).select('-password');
          if(user){
              res.send(user);
              console.log(user);
          }else{
              res.send({messege:"credentials are not match !!!"});
          }
      }
      else{
          res.send({messege:"credentials are not match !!!"});
      }
    } catch (error) {
      console.log(error);
    }
  
  }

module.exports={
    Login
}