const express = require ('express');
let User = require("../models/User");

const Register = async (req,res,next)=>{
    try {
      let user =new User(req.body);
      let result = await user.save();
      result = result.toObject();
      delete result.password;
      res.send(result);
      console.log(result);
    } catch (error) {
      console.log(error);
    }
  }

module.exports = {
    Register
}