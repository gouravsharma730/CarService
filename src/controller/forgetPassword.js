// const express = require('express');
// const router = express.Router();
// const User = require('../models/User');
// const sendEmail = require('../utils/email')
// const path = require('path');
// const forgetPasswordHTML = path.join(__dirname,'../static/forgetPassword.html');
// const jwt = require('jsonwebtoken');

// const forgetPassword = async function(req,res){
//     const email = req.body.email;
//     let userCheck = await User.find({email});
//     if(userCheck.length==0) return res.status(404).json({message:"Invalid Email address!"})
//     const subject= 'Password Change Request: Action Required'
//     const text = await jwt.sign({ id: userCheck[0]._id, userName: userCheck[0].userName, email: userCheck[0].email}, 'your_secret_key', { expiresIn: '700h' });
//     const response = await sendEmail(email,subject,text,forgetPasswordHTML,userCheck[0].userName);
//     const token = await jwt.sign({ id: userCheck[0]._id, userName: userCheck[0].userName, email: userCheck[0].email}, 'your_secret_key', { expiresIn: '700h' });

//     return res.status(201).json({message:response,token});
// }

// module.exports ={forgetPassword};