const express= require('express');
const User=require('../models/User')
const router=express.Router();
const {body, validationResult}= require ('express-validator');

const bcrypt=require('bcryptjs');

const jwt= require('jsonwebtoken');

const JWT_SECRET=process.env.SECRET_PIN

const fetchUser=require("../middleware/fetchUser");
//Create a user using:POST"/api/auth/binga"
router.post('/binga',[
  body('name').isLength({ min: 3 }),
  body('email').isEmail(),
  body('password').isLength({ min: 5 }),
],async (req, res) => {
  let success=false;

  //req(request) is used to send the data & res(resolve) is used to print the data
  const errors= validationResult(req);
  if(!errors.isEmpty()){
    return res.status(400).json({success, errors:errors.array()});
  }
  try{
    let user=await User.findOne({email:req.body.email});//here, we check wheather the user with same email is present on not in DB
    if(user){
      return res.status(400).json({success, error:"Sorry a user with this email already exists!"});
    }
    const salt=await bcrypt.genSalt(10);
    const secPass=await bcrypt.hash(req.body.password,salt);

    //Creating a user by using User.js as User
    await User.create({
      name:req.body.name,
      email:req.body.email,
      password:secPass
    })
    success= true;
    res.send({success, message:"Added successfully!"});
  }catch(error){
    console.error(error.message);
    res.status(500).send("some error occured");
  }
  //it is used when we don't use async await 
  // .then(user=>res.json(user))
  // .catch(err=>{console.log(err)
  //   res.json({error:"Enter unique value", Message:err.message})
  // })

})

// Authenticate a user POST"/api/auth/login"
router.post('/login',[
  body('email',"Enter a valid Email id").isEmail(),
  body('password',"Password can not be blank").exists()
],async (req, res) => {

  let success=false;

  const errors= validationResult(req);
  if(!errors.isEmpty()){
    return res.status(400).json({errors:errors.array()});
  }
  const {email,password}=req.body;
  try{
    let user=await User.findOne({email});
    if(!user){
      return res.status(400).json({ error:"Please try to login with correct credentials!"});
    } 
    const passwordCompare=await bcrypt.compare(password,user.password);
    if(!passwordCompare){
      return res.status(400).json({success, error:"Please try to login with correct credentials!"});
    }
    const data={
      user:{
        id:user.id
      }
    }
    console.log(JWT_SECRET);
    const autherToken=jwt.sign(data, JWT_SECRET);
    success=true;
    res.json({success, autherToken});
  }catch(error){
    console.error(error.message);
    res.status(500).send("Internal Server error occured");
  }
});

//Get loggedin User Details using Post:"/auth/login/getuser"
router.post('/getuser',fetchUser,async (req, res) => {
  try{
    const userID=req.user.id;
    const user= await User.findById(userID).select("-password");
    res.send(user);
  }catch(error){
    console.error(error.message);
    res.status(500).send("Internal Server error occured");
  }
})
module.exports=router