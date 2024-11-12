const User = require("../model/UserModel");
const bcrypt = require("bcrypt");
const jwt_Token = require('jsonwebtoken');
const config = require("../utils/config");

const UserController = ({
   register:async(req,res)=>{
    try {
        const {username,password} = req.body;
        if(!username || !password){
          return  res.status(400).json({message:"missing required feilds"})
        }
        const user = await User.findOne({username});
        if(user){
            return res.status(400).json({message:"username already exits"})
        }
        const hashedPassword =await bcrypt.hash(password,10);
        const newUser = new User({
            username,
            hashedPassword
        })
        const savedUser = await newUser.save();
        res.status(200).json({message:"user created successfully",savedUser})
    } catch (error) {
        res.status(500).json({message:error.message})
    }
   },
   login:async(req,res)=>{
    try {
        const {username,password} = req.body;
        if(!username || !password){
            return res.status(400).json({message:"missing required feilds"})
        }
        const user = await User.findOne({username});
        if(!user){
            return res.status(400).json({message:"username or password incorrect..!"})
        }      
          
        const isCorrectPassword = await bcrypt.compare(password,user.hashedPassword);
        
        if(!isCorrectPassword){
            return res.status(400).json({message:"username or password incorrect..!"})
        }
        const token = jwt_Token.sign({
            username:user.username,
            id:user._id
        },
        config.JWT_Secret,
        {expiresIn:"1d"}
       );
        res.cookie("token",token,{
            httpOnly:true,
            secure:true,
            sameSite:"none",
            expires: new Date(Date.now() + 24 * 60 * 60 * 1000)
        })
        res.status(200).json({message:"login successfully",token})
    } catch (error) {
        res.status(500).json({message:error.message})
    }
   },
   getAllUsers:async(req,res)=>{
    try {
        const user = await User.find()
        if(!user){
            return res.status(400).json({message:"user not found"})
        }
        res.status(200).json({message:"All Users",user})
    } catch (error) {
        res.status(500).json({message:error.message})
    }
   }
})

module.exports = UserController;